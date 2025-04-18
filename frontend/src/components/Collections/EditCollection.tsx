import {
  Button,
  ButtonGroup,
  DialogActionTrigger,
  Flex,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import { FaExchangeAlt } from "react-icons/fa"

import { type ApiError, Body_collections_update_collection, type CollectionPublic, CollectionsService } from "@/client"
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
import UpdateBannerUploadField from "../Common/BannerUploadField/Update"

interface EditCollectionProps {
  collection: CollectionPublic
}

const EditCollection = ({ collection }: EditCollectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()

  const methods = useForm<Body_collections_update_collection>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      collection: {
        title: collection.title
      },
      banner_desktop: undefined,
      banner_mobile: undefined,
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = methods

  const mutation = useMutation({
    mutationFn: (data: Body_collections_update_collection) =>
      CollectionsService.updateCollection({ id: collection.id, formData: data }),
    onSuccess: () => {
      showSuccessToast("Collection updated successfully.")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["collections"] })
    },
  })

  const onSubmit: SubmitHandler<Body_collections_update_collection> = async (data) => {
    console.log("Data: ", data);
    
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
          Edit Collection
        </Button>
      </DialogTrigger>
      <DialogContent
        w="auto"
        maxW="46rem"
      >
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Collection</DialogTitle>
            </DialogHeader>
            <DialogBody>
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
                  <UpdateBannerUploadField
                    field_id="banner_desktop"
                    label="Desktop Banner"
                    currentBannerUrl={collection.banner_desktop.url}
                    error={errors.banner_desktop?.message}
                    invalid={!!errors.banner_desktop}
                  />
                  <UpdateBannerUploadField
                    field_id="banner_mobile"
                    label="Mobile Banner"
                    currentBannerUrl={collection.banner_mobile.url}
                    error={errors.banner_mobile?.message}
                    invalid={!!errors.banner_mobile}
                  />
                </Flex>
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
        </FormProvider>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default EditCollection
