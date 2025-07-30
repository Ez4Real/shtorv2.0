import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Controller, FormProvider, type SubmitHandler, useForm } from "react-hook-form"

import {
  Box,
  Button,
  DialogActionTrigger,
  DialogTitle,
  FileUpload,
  Grid,
  GridItem,
  Input,
  NumberInput,
  Switch,
  Text,
  Textarea,
  useFileUpload,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { FaPlus } from "react-icons/fa"

import { type Body_products_create_product, CategoriesService, CollectionsService, ProductsService } from "@/client"
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
import SelectRelationshipField from "../Common/SelectRelationshipField"
import { LuUpload } from "react-icons/lu"
import ImagesOrderingContainer from "./ImageOrderingContainer"
import { InputGroup } from "../ui/input-group"

const AddProduct = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()

  const min_price = 0.9
  const max_price = 99999
  const step = .1


  const methods = useForm<Body_products_create_product>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      product: {
        category_id: "",
        collection_id: "",
        title_en: "",
        title_uk: "",
        description_en: "",
        description_uk: "",
        price_uah: min_price,
        price_usd: min_price,
        price_eur: min_price,
        attachment: false,
        is_gift: false,
        in_stock: true,
        preorder: false,
        sizes: null
      },
      images: undefined
    },
  })
    
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isSubmitting },
  } = methods

  const mutation = useMutation({
    mutationFn: (data: Body_products_create_product) =>
      ProductsService.createProduct({ formData: data }),
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

  const onSubmit: SubmitHandler<Body_products_create_product> = (data) => {
    mutation.mutate(data)
  }

  const fileUpload = useFileUpload({ maxFiles: 20, maxFileSize: 5242880 })


  useEffect(() => {
    methods.setValue("images", fileUpload.acceptedFiles)
  }, [fileUpload.acceptedFiles])

  return (
    <DialogRoot
      size={{ base: "xs", md: "xl" }}
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
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add Product</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Text mb={4}>Fill in the details to add a new product.</Text>
              <Grid
                templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]}
                gap="16px"
              >
                <Field
                  required
                  invalid={!!errors.product?.category_id}
                  errorText={errors.product?.category_id?.message}
                  label="Select category"
                >
                  <SelectRelationshipField
                    instanceName="category"
                    queryFn={CategoriesService.readCategories}
                    queryKey="categories"
                  />
                </Field>
                <Field
                  required
                  invalid={!!errors.product?.collection_id}
                  errorText={errors.product?.collection_id?.message}
                  label="Select collection"
                >
                  <SelectRelationshipField
                    instanceName="collection"
                    queryFn={CollectionsService.readCollections}
                    queryKey="collections"
                  />
                </Field>

                <Field
                  required
                  invalid={!!errors.product?.title_en}
                  errorText={errors.product?.title_en?.message}
                  label="English title"
                >
                  <Input
                    id="title_en"
                    {...register("product.title_en", {
                      required: "English title is required.",
                    })}
                    placeholder="English title"
                    type="text"
                  />
                </Field>

                <Field
                  required
                  invalid={!!errors.product?.title_uk}
                  errorText={errors.product?.title_uk?.message}
                  label="Ukrainian title"
                >
                  <Input
                    id="title_uk"
                    {...register("product.title_uk", {
                      required: "Ukrainian title is required.",
                    })}
                    placeholder="Ukrainian title"
                    type="text"
                  />
                </Field>

                <Field
                  required
                  invalid={!!errors.product?.description_en}
                  errorText={errors.product?.description_en?.message}
                  label="English description"
                >
                  <Textarea
                    id="description_en"
                    {...register("product.description_en", {
                      required: "English description is required.",
                      setValueAs: (value: string) => value.trim(),
                    })}
                    placeholder="English description"
                    resize="vertical"
                    minHeight="2.5rem"
                    maxHeight="8rem"
                  />
                </Field>
                <Field
                  required
                  invalid={!!errors.product?.description_uk}
                  errorText={errors.product?.description_uk?.message}
                  label="Ukrainian description"
                >
                  <Textarea
                    id="description_uk"
                    {...register("product.description_uk", {
                      required: "Ukrainian description is required.",
                      setValueAs: (value: string) => value.trim(),
                    })}
                    placeholder="Ukrainian description"
                    resize="vertical"
                    minHeight="2.5rem"
                    maxHeight="8rem"
                  />
                </Field>
 
                <Field
                  required
                  invalid={!!errors.product?.price_uah}
                  errorText={errors.product?.price_uah?.message}
                  label="Ukrainian Hryvnas"
                >
                  <NumberInput.Root
                    required
                    defaultValue="0.9"
                    step={step}
                    min={min_price}
                    max={max_price}
                    w="full"
                    id="price_uah"
                  >
                    <NumberInput.Control/>
                    <InputGroup
                      startElement={"₴"}
                      w="full"
                    >
                      <NumberInput.Input
                        {...register("product.price_uah", {
                          required: "Price in hryvnas is required.",
                          setValueAs: (value: string) => Number(value)
                        })}
                      />
                    </InputGroup>
                  </NumberInput.Root>
                </Field>

                <Field
                  required
                  invalid={!!errors.product?.price_usd}
                  errorText={errors.product?.price_usd?.message}
                  label="US Dollar"
                >
                  <NumberInput.Root
                    required
                    defaultValue="0.9"
                    step={step}
                    min={min_price}
                    max={max_price}
                    w="full"
                    id="price_usd"
                  >
                    <NumberInput.Control/>
                    <InputGroup
                      startElement={"$"}
                      w="full"
                    >
                      <NumberInput.Input
                        {...register("product.price_usd", {
                          required: "Price in dollars is required.",
                          setValueAs: (value: string) => Number(value)
                        })}
                      />
                    </InputGroup>
                  </NumberInput.Root>
                </Field>

                <Field
                  required
                  invalid={!!errors.product?.price_eur}
                  errorText={errors.product?.price_eur?.message}
                  label="Euro"
                >
                  <NumberInput.Root
                    required
                    defaultValue="0.9"
                    step={step}
                    min={min_price}
                    max={max_price}
                    w="full"
                    id="price_eur"
                  >
                    <NumberInput.Control/>
                    <InputGroup
                      startElement={"€"}
                      w="full"
                    >
                      <NumberInput.Input
                        {...register("product.price_eur", {
                          required: "Price in euros is required.",
                          setValueAs: (value: string) => Number(value)
                        })}
                      />
                    </InputGroup>
                  </NumberInput.Root>
                </Field>

                <GridItem />

                <Field
                  invalid={!!errors.product?.sizes}
                  errorText={errors.product?.sizes?.message}
                  label="Sizes"
                >
                  <Input
                    id="sizes"
                    {...register("product.sizes", {
                      required: false,
                      setValueAs: (value: string | null) => {
                        if (typeof value === "string") {
                          const trimmed = value.trim()
                          if (!trimmed) return null
                          const sizes = trimmed.split(/\s+/).filter(Boolean)
                          return sizes.length > 0 ? sizes : null
                        }
                        return null
                      }
                    })}
                    placeholder="Enter sizes separated by space"
                    type="text"
                  />
                </Field>

                <GridItem />

                <Controller
                  name="product.attachment"
                  control={control}
                  render={({ field }) => (
                    <Field 
                      alignSelf="center"
                      label="Apply attachment"
                    >
                      <Switch.Root
                        colorPalette="teal"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={({ checked }) => field.onChange(checked)}
                      >
                        <Switch.HiddenInput onBlur={field.onBlur} />
                        <Switch.Control />
                        
                      </Switch.Root>
                    </Field>
                  )}
                />

                <Controller
                  name="product.is_gift"
                  control={control}
                  render={({ field }) => (
                    <Field 
                      alignSelf="center"
                      label="Apply gift product"
                    >
                      <Switch.Root
                        colorPalette="teal"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={({ checked }) => field.onChange(checked)}
                      >
                        <Switch.HiddenInput onBlur={field.onBlur} />
                        <Switch.Control />
                        
                      </Switch.Root>
                    </Field>
                  )}
                />


                <Controller
                  name="product.in_stock"
                  control={control}
                  render={({ field }) => (
                    <Field 
                      alignSelf="center"
                      label="In Stock"
                    >
                      <Switch.Root
                        colorPalette="teal"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={({ checked }) => field.onChange(checked)}
                      >
                        <Switch.HiddenInput onBlur={field.onBlur} />
                        <Switch.Control />
                        
                      </Switch.Root>
                    </Field>
                  )}
                />

                <Controller
                  name="product.preorder"
                  control={control}
                  render={({ field }) => (
                    <Field 
                      alignSelf="center"
                      label="Pre-order"
                    >
                      <Switch.Root
                        colorPalette="teal"
                        name={field.name}
                        checked={field.value}
                        onCheckedChange={({ checked }) => field.onChange(checked)}
                      >
                        <Switch.HiddenInput onBlur={field.onBlur} />
                        <Switch.Control />
                        
                      </Switch.Root>
                    </Field>
                  )}
                />

              </Grid>

              <Field
                required
                label="Upload images"
                mt="16px"
              >
                <FileUpload.Root
                  alignItems="stretch"
                  maxFiles={20}
                  id="images"
                  accept={{ "image/*": ["jpg", "png"] }}
                >
                  <FileUpload.RootProvider value={fileUpload}>
                    <FileUpload.HiddenInput
                    />
                    <FileUpload.Dropzone minH="8rem" w="full">
                      <LuUpload />
                      <FileUpload.DropzoneContent>
                        <Box>Drag and drop up to 20 images</Box>
                        <Box color="fg.muted">PNG, JPG up to 5MB</Box>
                      </FileUpload.DropzoneContent>
                    </FileUpload.Dropzone>

                    {fileUpload.acceptedFiles.length > 0 && (
                      <ImagesOrderingContainer
                        fileUpload={fileUpload}
                      />
                    )}
                  </FileUpload.RootProvider>
                </FileUpload.Root>
              </Field>

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
        </FormProvider>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}

export default AddProduct
