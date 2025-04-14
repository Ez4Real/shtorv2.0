import {
  Box,
  Button,
  ButtonGroup,
  DialogActionTrigger,
  FileUpload,
  FileUploadRootProvider,
  Image,
  Input,
  Text,
  useFileUpload,
  VStack,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { FaExchangeAlt } from "react-icons/fa"

import { type ApiError, CollectionBase, type CollectionPublic, CollectionsService, OpenAPI } from "@/client"
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
import { LuFileImage, LuTrash2 } from "react-icons/lu"

interface EditCollectionProps {
  collection: CollectionPublic
}

interface CollectionUpdateForm {
  collection: CollectionBase
  banner?: File | Blob
}

const EditCollection = ({ collection }: EditCollectionProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const [currentBannerUrl, setCurrentBannerUrl] = useState<null | string>(collection.banner.url)
  const { showSuccessToast } = useCustomToast()

  const fileUpload = useFileUpload({
    maxFiles: 1,
    maxFileSize: 5242880,
    
  })

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CollectionUpdateForm>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      collection: {
        title: collection.title
      },
      banner: undefined,
    },
  })

  useEffect(() => {
    if (fileUpload.acceptedFiles.length > 0) {
      setValue("banner", fileUpload.acceptedFiles[0], { shouldValidate: true })
    }
  }, [fileUpload.acceptedFiles])

  const mutation = useMutation({
    mutationFn: (data: CollectionUpdateForm) =>
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

  const onSubmit: SubmitHandler<CollectionUpdateForm> = async (data) => {
    console.log("Data: ", data);
    
    mutation.mutate(data)
  }

  const handleRemoveImg = () => {
    fileUpload.clearFiles()
    setValue(
      "banner",
      undefined as unknown as File,
      { shouldValidate: true }
    )
    setCurrentBannerUrl(null)
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
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Collection</DialogTitle>
          </DialogHeader>
          {/* <DialogBody>
            <Text mb={4}>Update the collection details below.</Text>
            <VStack gap={4}>
              <Field
                required
                invalid={!!errors.title}
                errorText={errors.title?.message}
                label="Title"
              >
                <Input
                  id="title"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  placeholder="Title"
                  type="text"
                />
              </Field>

              <Field
                invalid={!!errors.description}
                errorText={errors.description?.message}
                label="Description"
              >
                <Input
                  id="description"
                  {...register("description")}
                  placeholder="Description"
                  type="text"
                />
              </Field>
            </VStack>
          </DialogBody> */}

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
              
              <Field
                label="Banner"
                required
                errorText={errors.banner?.message}
                invalid={!!errors.banner}
              >
                <FileUploadRootProvider
                  value={fileUpload}
                  flexDirection={["column", "row", "row", "row"]}
                >
                  <FileUpload.HiddenInput />
                  <FileUpload.Trigger asChild>
                    <Button variant="outline" size="sm">
                      <LuFileImage />
                      Upload Image
                    </Button>
                  </FileUpload.Trigger>

                  {fileUpload.acceptedFiles.length > 0 ? (
                    <FileUpload.Item
                      file={fileUpload.acceptedFiles[0]}
                      p={0}
                      rounded="md"
                    >
                      <FileUpload.ItemPreviewImage
                        w="100%"
                        h="auto"
                        rounded="md"
                      />
                      <FileUpload.ItemDeleteTrigger
                        onClick={handleRemoveImg}
                        boxSize={10}
                        p=".25rem"
                        position="relative"
                        right={"2.5rem"}
                      >
                        <LuTrash2 
                          size={20}
                          color="#ef4444"
                          cursor="pointer"
                        />
                      </FileUpload.ItemDeleteTrigger>
                    </FileUpload.Item>
                  ) : currentBannerUrl ? (
                    <Box position="relative">
                      <Image
                        src={`${OpenAPI.BASE}/media/${currentBannerUrl}`}
                        // w="100%"
                        // h="auto"
                        rounded="md"
                      />
                      <Button
                        // boxSize={10}
                        onClick={handleRemoveImg}
                        position="absolute"
                        top={0}
                        right={0}
                        p=".25rem"
                        bg={0}
                      >
                        <LuTrash2 
                          size={20}
                          color="#ef4444"
                          cursor="pointer"
                        />
                      </Button>
                    </Box>
                  ) : null }
                </FileUploadRootProvider>
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

export default EditCollection
