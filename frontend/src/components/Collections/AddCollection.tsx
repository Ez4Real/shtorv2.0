import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FormProvider, useForm, type SubmitHandler } from "react-hook-form"

import {
    Button,
    DialogActionTrigger,
    DialogTitle,
    Input,
    Text,
    VStack,
    Flex
  } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"

import { 
  CollectionsService,
  Body_collections_create_collection
} from "@/client"
import type { ApiError } from "@/client/core/ApiError"
import useCustomToast from "../../hooks/useCustomToast"
import { handleError } from "../../utils"

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
import CreateBannerUploadField from "../Common/BannerUploadField/Create"


const AddCollection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()

  const methods = useForm<Body_collections_create_collection>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      collection: {
        title: ""
      },
      banner_desktop: undefined,
      banner_mobile: undefined,
    }
  })
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = methods
    
  const mutation = useMutation({
    mutationFn: (data: Body_collections_create_collection) =>
      CollectionsService.createCollection({ formData: data }),
    onSuccess: () => {
      showSuccessToast("Collection created successfully")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => handleError(err),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
    },
  })

  const onSubmit: SubmitHandler<Body_collections_create_collection> =  (data) => {
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
          <Button value="add-collection" my={4}>
            <FaPlus fontSize="16px" />
            Add Collection
          </Button>
        </DialogTrigger>
        <DialogContent
          w="auto"
          maxW="46rem"
        >
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add Collection</DialogTitle>
              </DialogHeader>
              <DialogBody pb={0}>
                <Text mb={4}>Fill in the details to add a new collection.</Text>
                <VStack gap={4}>
                  <Field
                    required
                    invalid={!!errors.collection?.title}
                    errorText={errors.collection?.title?.message}
                    label="Title"
                  >
                    <Input
                      id="title"
                      {...register("collection.title", {
                        required: "Title is required.",
                      })}
                      placeholder="Title"
                      type="text"
                      />
                  </Field>
                  
                  <Flex 
                    gap="1rem"
                    w="100%"
                    maxH={["unset", "525px", "525px", "525px"]}
                    direction={["column", "row", "row", "row"]}
                  >
                    <CreateBannerUploadField
                      field_id="banner_desktop"
                      label="Desktop Banner"
                      error={errors.banner_desktop?.message}
                      invalid={!!errors.banner_desktop}
                    />
                    <CreateBannerUploadField
                      field_id="banner_mobile"
                      label="Mobile Banner"
                      error={errors.banner_mobile?.message}
                      invalid={!!errors.banner_mobile}
                    />
                  </Flex>
                </VStack>
              </DialogBody>
    
              <DialogFooter gap={2} pt={4}>
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
                >Save
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    )
  }

export default AddCollection
