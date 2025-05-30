import { OpenAPI } from "@/client"
import { Box, Button, FileUpload, FileUploadRootProvider, Image, useFileUpload } from "@chakra-ui/react"
import { LuFileImage, LuTrash2 } from "react-icons/lu"
import { Field } from "../../ui/field"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"


interface UpdateBannerUploadFieldProps {
  field_id: "banner_desktop" | "banner_mobile"
  label: string
  currentBannerUrl: string
  error?: string
  invalid?: boolean
}
  
const UpdateBannerUploadField = ({
  field_id,
  label,
  currentBannerUrl,
  error,
  invalid
}: UpdateBannerUploadFieldProps) => {
  const fileUpload = useFileUpload({ maxFiles: 1, maxFileSize: 5242880 })
  const [bannerUrl, setBannerUrl] = useState<null | string>(currentBannerUrl)

  const {
    setValue
  } = useFormContext()

  useEffect(() => {
    if (fileUpload.acceptedFiles.length > 0) {
      setValue(field_id, fileUpload.acceptedFiles[0], { shouldValidate: true })
    }
  }, [fileUpload.acceptedFiles])

  const handleRemoveImg = () => {
    fileUpload.clearFiles()
    setValue(
      field_id,
      undefined as unknown as File,
      { shouldValidate: true }
    )
    setBannerUrl(null)
  }

  return (
    <Field
      label={label}
      required
      errorText={error}
      invalid={invalid}
    >
      <FileUploadRootProvider value={fileUpload}>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button
            variant="outline"
            size="sm"
          >
            <LuFileImage />
            Upload Image
          </Button>
        </FileUpload.Trigger>
  
        {fileUpload.acceptedFiles.length > 0 ? (
          <FileUpload.Item
            file={fileUpload.acceptedFiles[0]}
            p={0}
            rounded="md"
            w="auto"
          >
            <FileUpload.ItemPreviewImage
              w="100%"
              h="100%"
              maxH="26rem"
              rounded="md"
            />
            <FileUpload.ItemDeleteTrigger
              onClick={handleRemoveImg}
              p=".25rem"
              position="absolute"
              boxSize={10}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <LuTrash2 size={20} color="#ef4444" cursor="pointer" />
            </FileUpload.ItemDeleteTrigger>
          </FileUpload.Item>
        ) : bannerUrl ? (
          <Box position="relative">
            <Image
              src={`${OpenAPI.BASE}/media/${bannerUrl}`}
              w="100%"
              h="100%"
              maxH="26rem"
              rounded="md"
            />
            <Button
              onClick={handleRemoveImg}
              position="absolute"
              p=".25rem"
              top={0}
              bg={0}
            >
              <LuTrash2 size={20} color="#ef4444" cursor="pointer" />
            </Button>
          </Box>
        ) : null}
      </FileUploadRootProvider>
    </Field>
)}
  
export default UpdateBannerUploadField