import { useState, useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, type SubmitHandler } from "react-hook-form"

import {
    Button,
    DialogActionTrigger,
    DialogTitle,
    FileUpload,
    Input,
    Text,
    VStack,
    FileUploadRootProvider,
    useFileUpload
  } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"
import { LuFileImage, LuTrash2 } from "react-icons/lu"

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


const AddCollection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
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
    formState: { errors, isValid, isSubmitting },
  } = useForm<Body_collections_create_collection>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      collection: {
        title: ""
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

  const handleRemoveImg = () => {
    fileUpload.clearFiles()
    setValue(
      "banner",
      undefined as unknown as File,
      { shouldValidate: true }
    )
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
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Collection</DialogTitle>
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

                    {fileUpload.acceptedFiles.length > 0 && (
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
                          p=".25rem"
                          position="absolute"
                          right={0}
                          boxSize={10}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <LuTrash2 
                            size={20}
                            color="#ef4444"
                            cursor="pointer"
                          />
                        </FileUpload.ItemDeleteTrigger>
                      </FileUpload.Item>
                    )}
                  </FileUploadRootProvider>
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
              >Save
              </Button>
            </DialogFooter>
          </form>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    )
  }

export default AddCollection
