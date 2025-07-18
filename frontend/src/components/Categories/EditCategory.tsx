import {
  Button,
  ButtonGroup,
  DialogActionTrigger,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FaExchangeAlt } from "react-icons/fa"

import { type ApiError, type ProductCategoryPublic, CategoriesService } from "@/client"
import useCustomToast from "@/hooks/useCustomToast"
import { handleError } from "@/utils"
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field } from "../ui/field"

interface EditCategoryProps {
  category: ProductCategoryPublic
}

interface CategoryUpdateForm {
  title_en: string
  title_uk: string
}

const EditCategory = ({ category }: EditCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CategoryUpdateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      ...category
    },
  })

  const mutation = useMutation({
    mutationFn: (data: CategoryUpdateForm) =>
      CategoriesService.updateCategory({ id: category.id, requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Category updated successfully.")
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

  const onSubmit: SubmitHandler<CategoryUpdateForm> = async (data) => {
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
        <Button variant="ghost">
          <FaExchangeAlt fontSize="16px" />
          Edit Category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>Update the category details below.</Text>
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
                    required: "English title is required",
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
                    required: "Ukrainian title is required",
                  })}
                  placeholder="Ukrainian title"
                  type="text"
                />
              </Field>

              
            </VStack>
          </DialogBody>

          <DialogFooter gap={2}>
            <ButtonGroup>
              <DialogActionTrigger asChild>
                <Button
                  variant="subtle"
                  colorPalette="gray"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button variant="solid" type="submit" loading={isSubmitting}>
                Save
              </Button>
            </ButtonGroup>
          </DialogFooter>
        </form>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default EditCategory
