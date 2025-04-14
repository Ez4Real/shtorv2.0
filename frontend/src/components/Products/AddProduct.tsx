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

import { type ProductCreate, ProductsService } from "@/client"
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

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ProductCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      title: "",
      description: "",
    },
  })

  const mutation = useMutation({
    mutationFn: (data: ProductCreate) =>
      ProductsService.createProduct({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Product created successfully.")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const onSubmit: SubmitHandler<ProductCreate> = (data) => {
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
        <Button value="add-product" my={4}>
          <FaPlus fontSize="16px" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Product</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text mb={4}>Fill in the details to add a new product.</Text>
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
                    required: "Title is required.",
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

export default AddProduct


// import {
//   Button,
//   Grid,
//   GridItem,
//   Input,
//   NumberInput,
//   Select,
//   Textarea,
// } from "@chakra-ui/react"
// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { useRef, useState } from "react"
// import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
// // import { useTranslation } from "react-i18next"
// import { FiImage } from "react-icons/fi"
// import {
//   type ApiError,
//   // type ImageItem,
//   type ProductCreate,
//   ProductsService,
// } from "../../client"
// import useCustomToast from "../../hooks/useCustomToast"
// import { handleError, validateImage } from "../../utils"
// import ProductSizeField from "../Common/ProductSizeField"
// import ImagesOrderingContainer from "./ImageOrderingContainer"

// interface AddProductProps {
//   isOpen: boolean
//   onClose: () => void
// }

// const AddProduct = ({ isOpen, onClose }: AddProductProps) => {
//   // const { t } = useTranslation()
//   const scrollbarColor = useColorModeValue("ui.main", "ui.dim")
//   const queryClient = useQueryClient()
//   const showToast = useCustomToast()

//   const [images, setImages] = useState<Array<ImageItem>>([])
//   const imageInputRef = useRef<HTMLInputElement>(null)

//   const [sizesAreList, setSizesAreList] = useState<boolean>(false)

//   const methods = useForm<ProductCreate>({
//     mode: "onBlur",
//     criteriaMode: "all",
//     defaultValues: {
//       category: undefined,
//       title_en: "",
//       title_uk: "",
//       material_en: "",
//       material_uk: "",
//       price_usd: 0.9,
//       price_uah: 0.9,
//       size_en: "",
//       size_uk: "",
//       weight_en: "",
//       weight_uk: "",
//       tag: undefined,
//       images: [],
//     },
//   })

//   const mutation = useMutation({
//     mutationFn: (data: ProductCreate) =>
//       ProductsService.createProduct({ requestBody: data }),
//     onSuccess: () => {
//       showToast(
//         t("AdminPanel.products.addProduct.onSuccessCreateToast.success"),
//         t("AdminPanel.products.addProduct.onSuccessCreateToast.created"),
//         "success",
//       )
//       reset()
//       setImages([])
//       onClose()
//     },
//     onError: (err: ApiError) => {
//       handleError(err, showToast)
//     },
//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["products"] })
//     },
//   })

//   const {
//     register,
//     handleSubmit,
//     setError,
//     clearErrors,
//     reset,
//     formState: { errors, isSubmitting },
//   } = methods

//   const onSubmit: SubmitHandler<ProductCreate> = async (data) => {
//     let imageFiles
//     if (images && images.length > 0) {
//       const uploadedImages = await saveImagesToLocalStorage(images)
//       imageFiles = uploadedImages.map((img, index) => ({
//         url: img.url,
//         alt_text: data.category || "",
//         order: index + 1,
//       }))
//     }

//     const processedData = {
//       ...data,
//       tag: data.tag || null,
//       weight_en: data.weight_en || null,
//       weight_uk: data.weight_uk || null,
//       ...(imageFiles ? { images: imageFiles } : {}),
//     }
//     mutation.mutate(processedData)
//   }

//   const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files
//     const allowedFormats = ["image/png", "image/jpg", "image/jpeg"]

//     if (files) {
//       const validatedImages = Array.from(files).map((file, index) =>
//         validateImage(file, index, allowedFormats, t),
//       )
//       const error = validatedImages.find(
//         (imageObj) => imageObj.error !== null,
//       )?.error

//       if (error) {
//         setError("images", {
//           type: "manual",
//           message: error,
//         })
//       } else {
//         clearErrors("images")
//       }

//       const validImages = validatedImages
//         .map((imageObj) => imageObj.image)
//         .filter((image) => image !== null) as Array<ImageItem>
//       setImages((prev) => [...prev, ...validImages])
//     }
//   }

//   const handleRemoveImage = (id: string) => {
//     const filtered = images.filter((img) => img.id !== id)
//     setImages(filtered)
//   }

//   const saveImagesToLocalStorage = async (
//     images: Array<{ id: string; file: File }>,
//   ): Promise<Array<{ url: string }>> => {
//     const formData = new FormData()
//     images.forEach((image) => {
//       formData.append("images", image.file)
//     })

//     const response = await ProductsService.uploadImages(formData)
//     return response.urls.map((url: string) => ({ url }))
//   }

//   return (
//     <>
//       <Modal
//         isOpen={isOpen}
//         onClose={onClose}
//         motionPreset="slideInBottom"
//         scrollBehavior="outside"
//       >
//         <ModalOverlay backdropFilter="auto" backdropBlur="2px" />
//         <FormProvider {...methods}>
//           <ModalContent
//             as="form"
//             onSubmit={handleSubmit(onSubmit)}
//             maxW="95%"
//             my="2rem"
//             containerProps={{
//               sx: {
//                 "::-webkit-scrollbar-thumb": {
//                   background: scrollbarColor,
//                 },
//               },
//             }}
//           >
//             <ModalHeader>{t("AdminPanel.actions.addProduct")}</ModalHeader>
//             <ModalCloseButton />
//             <ModalBody pb={6}>
//               <Grid templateColumns="repeat(2, 1fr)" gap="1rem">
//                 <GridItem>
//                   <FormControl isRequired isInvalid={!!errors.category}>
//                     <FormLabel htmlFor="category">
//                       {t(
//                         "AdminPanel.products.addProduct.fields.category.title",
//                       )}
//                     </FormLabel>
//                     <Select
//                       {...register("category", {
//                         required: t(
//                           "AdminPanel.products.addProduct.fields.category.required",
//                         ),
//                       })}
//                       variant="outline"
//                       placeholder={t(
//                         "AdminPanel.products.addProduct.fields.category.placeholder",
//                       )}
//                     >
//                       <option value="Carabiner">
//                         {t("AdminPanel.products.categories.carabiner")}
//                       </option>
//                       <option value="Book holder">
//                         {t("AdminPanel.products.categories.bookHolder")}
//                       </option>
//                       <option value="Choker">
//                         {t("AdminPanel.products.categories.choker")}
//                       </option>
//                       <option value="Plate">
//                         {t("AdminPanel.products.categories.plate")}
//                       </option>
//                       <option value="Soap holder">
//                         {t("AdminPanel.products.categories.soapHolder")}
//                       </option>
//                       <option value="Ivan the table">
//                         {t("AdminPanel.products.categories.tableIvan")}
//                       </option>
//                     </Select>
//                     {errors.category && (
//                       <FormErrorMessage>
//                         {errors.category.message}
//                       </FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//                 <GridItem>
//                   <FormControl isInvalid={!!errors.tag} variant="floatingLabel">
//                     <FormLabel htmlFor="tag">
//                       {t("AdminPanel.products.addProduct.fields.tag.title")}
//                     </FormLabel>
//                     <Select
//                       {...register("tag")}
//                       variant="outline"
//                       placeholder={t(
//                         "AdminPanel.products.addProduct.fields.tag.placeholder",
//                       )}
//                     >
//                       <option value="bunny">
//                         {t("AdminPanel.products.tags.bunny")}
//                       </option>
//                       <option value="heart">
//                         {t("AdminPanel.products.tags.heart")}
//                       </option>
//                       <option value="shuriken">
//                         {t("AdminPanel.products.tags.shuriken")}
//                       </option>
//                       <option value="spikelet">
//                         {t("AdminPanel.products.tags.spikelet")}
//                       </option>
//                     </Select>
//                     {errors.tag && (
//                       <FormErrorMessage>{errors.tag.message}</FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//                 <GridItem>
//                   <FormControl isRequired isInvalid={!!errors.title_en}>
//                     <FormLabel htmlFor="title_en">
//                       {t(
//                         "AdminPanel.products.addProduct.fields.title_en.title",
//                       )}
//                     </FormLabel>
//                     <Input
//                       id="title_en"
//                       {...register("title_en", {
//                         required: t(
//                           "AdminPanel.products.addProduct.fields.title_en.required",
//                         ),
//                         setValueAs: (value: string) => value.trim(),
//                       })}
//                       placeholder={t(
//                         "AdminPanel.products.addProduct.fields.title_en.placeholder",
//                       )}
//                     />
//                     {errors.title_en && (
//                       <FormErrorMessage>
//                         {errors.title_en.message}
//                       </FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//                 <GridItem>
//                   <FormControl isRequired isInvalid={!!errors.title_uk}>
//                     <FormLabel htmlFor="title_uk">
//                       {t(
//                         "AdminPanel.products.addProduct.fields.title_uk.title",
//                       )}
//                     </FormLabel>
//                     <Input
//                       id="title_uk"
//                       {...register("title_uk", {
//                         required: t(
//                           "AdminPanel.products.addProduct.fields.title_uk.required",
//                         ),
//                         setValueAs: (value: string) => value.trim(),
//                       })}
//                       placeholder={t(
//                         "AdminPanel.products.addProduct.fields.title_uk.placeholder",
//                       )}
//                     />
//                     {errors.title_uk && (
//                       <FormErrorMessage>
//                         {errors.title_uk.message}
//                       </FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//                 <GridItem>
//                   <FormControl isRequired isInvalid={!!errors.material_en}>
//                     <FormLabel htmlFor="material_en">
//                       {t(
//                         "AdminPanel.products.addProduct.fields.material_en.title",
//                       )}
//                     </FormLabel>
//                     <Textarea
//                       id="material_en"
//                       {...register("material_en", {
//                         required: t(
//                           "AdminPanel.products.addProduct.fields.material_en.required",
//                         ),
//                         setValueAs: (value: string) => value.trim(),
//                       })}
//                       placeholder={t(
//                         "AdminPanel.products.addProduct.fields.material_en.placeholder",
//                       )}
//                       resize="vertical"
//                       minHeight="2.5rem"
//                       maxHeight="8rem"
//                     />
//                     {errors.material_en && (
//                       <FormErrorMessage>
//                         {errors.material_en.message}
//                       </FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//                 <GridItem>
//                   <FormControl isRequired isInvalid={!!errors.material_uk}>
//                     <FormLabel htmlFor="material_uk">
//                       {t(
//                         "AdminPanel.products.addProduct.fields.material_uk.title",
//                       )}
//                     </FormLabel>
//                     <Textarea
//                       id="material_uk"
//                       {...register("material_uk", {
//                         required: t(
//                           "AdminPanel.products.addProduct.fields.material_uk.required",
//                         ),
//                         setValueAs: (value: string) => value.trim(),
//                       })}
//                       placeholder={t(
//                         "AdminPanel.products.addProduct.fields.material_uk.placeholder",
//                       )}
//                       resize="vertical"
//                       minHeight="2.5rem"
//                       maxHeight="8rem"
//                     />
//                     {errors.material_uk && (
//                       <FormErrorMessage>
//                         {errors.material_uk.message}
//                       </FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//                 <GridItem>
//                   <FormControl isRequired isInvalid={!!errors.price_usd}>
//                     <FormLabel htmlFor="price_usd">
//                       {t(
//                         "AdminPanel.products.addProduct.fields.price_usd.title",
//                       )}
//                     </FormLabel>
//                     <InputGroup>
//                       <InputLeftElement
//                         pointerEvents="none"
//                         fontFamily="Inter,sans-serif"
//                         color="gray.300"
//                         fontSize="1.2em"
//                       >
//                         $
//                       </InputLeftElement>
//                       <NumberInput
//                         precision={2}
//                         step={0.2}
//                         min={0.9}
//                         max={99999}
//                         w="100%"
//                         allowMouseWheel
//                       >
//                         <NumberInputField
//                           id="price_usd"
//                           {...register("price_usd", {
//                             required: t(
//                               "AdminPanel.products.addProduct.fields.price_usd.required",
//                             ),
//                             min: 0.9,
//                             max: 99999,
//                           })}
//                           pl="2.5rem"
//                         />
//                         <NumberInputStepper>
//                           <NumberIncrementStepper />
//                           <NumberDecrementStepper />
//                         </NumberInputStepper>
//                       </NumberInput>
//                     </InputGroup>
//                     {errors.price_usd && (
//                       <FormErrorMessage>
//                         {errors.price_usd.message}
//                       </FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//                 <GridItem>
//                   <FormControl isRequired isInvalid={!!errors.price_uah}>
//                     <FormLabel htmlFor="price_uah">
//                       {t(
//                         "AdminPanel.products.addProduct.fields.price_uah.title",
//                       )}
//                     </FormLabel>
//                     <InputGroup>
//                       <InputLeftElement
//                         pointerEvents="none"
//                         fontFamily="Inter,sans-serif"
//                         color="gray.300"
//                         fontSize="1.2em"
//                       >
//                         ₴
//                       </InputLeftElement>
//                       <NumberInput
//                         precision={2}
//                         step={0.2}
//                         min={0.9}
//                         max={99999}
//                         w="100%"
//                         allowMouseWheel
//                       >
//                         <NumberInputField
//                           id="price_uah"
//                           {...register("price_uah", {
//                             required: t(
//                               "AdminPanel.products.addProduct.fields.price_uah.required",
//                             ),
//                             min: 0.9,
//                             max: 99999,
//                           })}
//                           pl="2.5rem"
//                         />
//                         <NumberInputStepper>
//                           <NumberIncrementStepper />
//                           <NumberDecrementStepper />
//                         </NumberInputStepper>
//                       </NumberInput>
//                     </InputGroup>
//                     {errors.price_uah && (
//                       <FormErrorMessage>
//                         {errors.price_uah.message}
//                       </FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//                 <GridItem>
//                   <ProductSizeField
//                     id="size_en"
//                     isChecked={sizesAreList}
//                     setIsChecked={setSizesAreList}
//                   />
//                 </GridItem>
//                 <GridItem>
//                   <ProductSizeField
//                     id="size_uk"
//                     isChecked={sizesAreList}
//                     setIsChecked={setSizesAreList}
//                   />
//                 </GridItem>
//                 <GridItem>
//                   <FormControl isInvalid={!!errors.weight_en}>
//                     <FormLabel htmlFor="weight_en">
//                       {t(
//                         "AdminPanel.products.addProduct.fields.weight_en.title",
//                       )}
//                     </FormLabel>
//                     <Input
//                       id="weight_en"
//                       {...register("weight_en", {
//                         setValueAs: (value: string) => value.trim(),
//                       })}
//                       placeholder={t(
//                         "AdminPanel.products.addProduct.fields.weight_en.placeholder",
//                       )}
//                     />
//                     {errors.weight_en && (
//                       <FormErrorMessage>
//                         {errors.weight_en.message}
//                       </FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//                 <GridItem>
//                   <FormControl isInvalid={!!errors.weight_uk}>
//                     <FormLabel htmlFor="weight_uk">
//                       {t(
//                         "AdminPanel.products.addProduct.fields.weight_uk.title",
//                       )}
//                     </FormLabel>
//                     <Input
//                       id="weight_uk"
//                       {...register("weight_uk", {
//                         setValueAs: (value: string) => value.trim(),
//                       })}
//                       placeholder={t(
//                         "AdminPanel.products.addProduct.fields.weight_uk.placeholder",
//                       )}
//                     />
//                     {errors.weight_uk && (
//                       <FormErrorMessage>
//                         {errors.weight_uk.message}
//                       </FormErrorMessage>
//                     )}
//                   </FormControl>
//                 </GridItem>
//               </Grid>

//               <FormControl isInvalid={!!errors.images} mt="1rem">
//                 <FormLabel>
//                   {t("AdminPanel.products.addProduct.fields.images.title")}
//                 </FormLabel>
//                 <InputGroup>
//                   <InputLeftElement pointerEvents="none">
//                     <FiImage />
//                   </InputLeftElement>
//                   <Input
//                     {...register("images")}
//                     type="file"
//                     accept=".jpg, .jpeg, .png"
//                     multiple
//                     hidden
//                     ref={imageInputRef}
//                     onChange={handleImageUpload}
//                   />
//                   <Input
//                     readOnly
//                     placeholder={t(
//                       "AdminPanel.products.addProduct.fields.images.placeholder",
//                     )}
//                     onClick={() => imageInputRef.current?.click()}
//                     value={images.map((img) => img.file.name).join(", ")}
//                     fontSize="sm"
//                   />
//                 </InputGroup>
//                 <FormErrorMessage>{errors?.images?.message}</FormErrorMessage>
//               </FormControl>

//               {images.length > 0 && (
//                 <ImagesOrderingContainer
//                   images={images}
//                   setImages={setImages}
//                   onRemove={handleRemoveImage}
//                   scrollbarColor={scrollbarColor}
//                 />
//               )}
//             </ModalBody>
//             <ModalFooter gap={3} pt={1}>
//               <Button variant="primary" type="submit" isLoading={isSubmitting}>
//                 {t("AdminPanel.actions.save")}
//               </Button>
//               <Button onClick={onClose}>
//                 {t("AdminPanel.actions.cancel")}
//               </Button>
//             </ModalFooter>
//           </ModalContent>
//         </FormProvider>
//       </Modal>
//     </>
//   )
// }

// export default AddProduct
