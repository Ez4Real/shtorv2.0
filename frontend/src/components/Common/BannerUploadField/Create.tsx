import { Box, Button, FileUpload, FileUploadRootProvider, useFileUpload } from "@chakra-ui/react"
import { LuFileImage, LuTrash2 } from "react-icons/lu"
import { Field } from "../../ui/field"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"


interface CreateBannerUploadFieldProps {
  field_id: "banner_desktop" | "banner_mobile"
  label: string
  error?: string
  invalid?: boolean
}
  
const CreateBannerUploadField = ({
  field_id,
  label,
  error,
  invalid
}: CreateBannerUploadFieldProps) => {
  const fileUpload = useFileUpload({ maxFiles: 1, maxFileSize: 5242880 })

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

        {fileUpload.acceptedFiles.length > 0 && (
          <FileUpload.Item
            file={fileUpload.acceptedFiles[0]}
            p={0}
            rounded="md"
            w="auto"
          >
          <Box>
            <FileUpload.ItemPreviewImage
              w="100%"
              h="100%"
              maxH={["unset", "26rem", "26rem", "26rem"]}
              rounded="md"
            /></Box>
            <FileUpload.ItemDeleteTrigger
              onClick={() => handleRemoveImg}
              p=".25rem"
              position="absolute"
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
)}
  
export default CreateBannerUploadField