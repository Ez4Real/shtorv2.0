import { useMutation, useQueryClient } from "@tanstack/react-query"
import { type SubmitHandler, useForm } from "react-hook-form"

import {
  Button,
  DialogActionTrigger,
  DialogTitle,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaPlus } from "react-icons/fa"

import { type ProductCategoryCreate, CategoriesService } from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "../ui/dialog"
import { Field } from "../ui/field"

const AddCategory = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProductCategoryCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title_en: "",
      title_uk: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: ProductCategoryCreate) =>
      CategoriesService.createCategory({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Category created successfully.")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const onSubmit: SubmitHandler<ProductCategoryCreate> = (data) => {
    mutation.mutate(data)
  }

  return (
    <DialogRoot
      size={{ base: "xs", md: "md" }}
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button value="add-category" my={4}>
          <FaPlus fontSize="16px" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>Fill in the details to add a new category.</Text>
            <VStack gap={4}>
              <Field
                required
                invalid={!!errors.title_en}
                errorText={errors.title_en?.message}
                label="English title"
              >
                <Input
                  id="title_en"
                  {...register("title_en", {
                    required: "English title is required.",
                  })}
                  placeholder="English title"
                  type="text"
                />
              </Field>
              <Field
                required
                invalid={!!errors.title_uk}
                errorText={errors.title_uk?.message}
                label="Ukrainian title"
              >
                <Input
                  id="title_uk"
                  {...register("title_uk", {
                    required: "Ukrainian title is required.",
                  })}
                  placeholder="Ukrainian title"
                  type="text"
                />
              </Field>

              
            </VStack>
          </DialogBody>

          <DialogFooter gap={2}>
            <DialogActionTrigger asChild>
              <Button
                variant="subtle"
                colorPalette="gray"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
            <Button
              variant="solid"
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddCategory
