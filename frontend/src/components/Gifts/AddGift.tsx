import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Controller, FormProvider, useForm, type SubmitHandler } from "react-hook-form"

import {
    Button,
    DialogActionTrigger,
    DialogTitle,
    Input,
    Text,
    Grid,
    NumberInput,
    GridItem,
    Switch,
    Textarea,
    FileUpload,
    Box,
    useFileUpload,
    Select,
    createListCollection
  } from "@chakra-ui/react"
import { FaPlus } from "react-icons/fa"

import { 
  GiftsService,
  Body_gifts_create_gift
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
import { InputGroup } from "../ui/input-group"
import { LuUpload } from "react-icons/lu"
import ImagesOrderingContainer from "../Products/ImageOrderingContainer"

const AddGift = () => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()

  const min_price = 0.9
  const max_price = 99999
  const step = .1

  const methods = useForm<Body_gifts_create_gift>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      gift: {
        title_en: "",
        title_uk: "",
        description_en: "",
        description_uk: "",
        price_uah: min_price,
        price_usd: min_price,
        price_eur: min_price,
        dynamic_price: false,
        occasion: "STANDARD"
      },
      images: undefined,
    }
  })
  
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isSubmitting },
  } = methods
    
  const mutation = useMutation({
    mutationFn: (data: Body_gifts_create_gift) =>
      GiftsService.createGift({ formData: data }),
    onSuccess: () => {
      showSuccessToast("Gift created successfully")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => handleError(err),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] })
    },
  })

  const onSubmit: SubmitHandler<Body_gifts_create_gift> =  (data) => {
    console.log(data);
    
    mutation.mutate(data)
  }

  const fileUpload = useFileUpload({ maxFiles: 20, maxFileSize: 5242880 })

  useEffect(() => {
    methods.setValue("images", fileUpload.acceptedFiles)
  }, [fileUpload.acceptedFiles])


  // #Temporary# Woman's Day 2026 Block
  const occasionCollection = createListCollection({
    items: [
      { label: "Standard", value: "STANDARD" },
      { label: "March 8", value: "MARCH8" },
    ],
  });
  // __________________________________

  

  return (
      <DialogRoot
        size={{ base: "xs", md: "xl" }}
        placement="center"
        open={isOpen}
        onOpenChange={({ open }) => setIsOpen(open)}
      >
        <DialogTrigger asChild>
          <Button value="add-gift" my={4}>
            <FaPlus fontSize="16px" />
            Add Gift
          </Button>
        </DialogTrigger>
        <DialogContent>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>Add Gift</DialogTitle>
              </DialogHeader>
              <DialogBody pb={0}>
                <Text mb={4}>Fill in the details to add a new gift.</Text>
                <Grid
                  templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(2, 1fr)"]}
                  gap="16px"
                >
                  <Field
                    required
                    invalid={!!errors.gift?.title_en}
                    errorText={errors.gift?.title_en?.message}
                    label="English title"
                  >
                    <Input
                      id="title_en"
                      {...register("gift.title_en", {
                        required: "English title is required.",
                      })}
                      placeholder="English title"
                      type="text"
                      />
                  </Field>
                  <Field
                    required
                    invalid={!!errors.gift?.title_uk}
                    errorText={errors.gift?.title_uk?.message}
                    label="Ukrainian title"
                  >
                    <Input
                      id="title_uk"
                      {...register("gift.title_uk", {
                        required: "Ukrainian title is required.",
                      })}
                      placeholder="Ukrainian title"
                      type="text"
                      />
                  </Field>

                  <Field
                    required
                    invalid={!!errors.gift?.description_en}
                    errorText={errors.gift?.description_en?.message}
                    label="English description"
                  >
                    <Textarea
                      id="description_en"
                      {...register("gift.description_en", {
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
                    invalid={!!errors.gift?.description_uk}
                    errorText={errors.gift?.description_uk?.message}
                    label="Ukrainian description"
                  >
                    <Textarea
                      id="description_uk"
                      {...register("gift.description_uk", {
                        required: "Ukrainian description is required.",
                        setValueAs: (value: string) => value.trim(),
                      })}
                      placeholder="Ukrainian description"
                      resize="vertical"
                      minHeight="2.5rem"
                      maxHeight="8rem"
                    />
                  </Field>

                  <Controller
                    name="gift.dynamic_price"
                    control={control}
                    render={({ field }) => (
                      <Field 
                        alignSelf="center"
                        label="Apply optional price"
                      >
                        <Switch.Root
                          colorPalette="green"
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

                  <Field
                    required
                    invalid={!!errors.gift?.occasion}
                    errorText={errors.gift?.occasion?.message}
                    label="Related Event"
                  >
                    <Select.Root
                      collection={occasionCollection}
                      id="gift.occasion"
                      {...register('gift.occasion', {
                        required: "Event is required.",
                      })}
                      size="sm"
                      width="full"
                      defaultValue={["STANDARD"]}
                    >
                        <Select.HiddenSelect />
                        <Select.Control>
                        <Select.Trigger>
                            <Select.ValueText
                              placeholder="Select a related event"
                            />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.Indicator />
                        </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                        <Select.Content>
                            {occasionCollection.items.map((instance) => (
                            <Select.Item
                              item={instance}
                              key={instance.value}
                            >
                                {instance.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                            ))}
                        </Select.Content>
                        </Select.Positioner>
                    </Select.Root>
                  </Field>

                  <Field
                    required
                    invalid={!!errors.gift?.price_uah}
                    errorText={errors.gift?.price_uah?.message}
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
                        {...register("gift.price_uah", {
                          required: "Price in hryvnas is required.",
                          setValueAs: (value: string) => Number(value)
                        })}
                      />
                      </InputGroup>
                    </NumberInput.Root>
                  </Field>
                  <Field
                    required
                    invalid={!!errors.gift?.price_usd}
                    errorText={errors.gift?.price_usd?.message}
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
                        {...register("gift.price_usd", {
                          required: "Price in US dollars is required.",
                          setValueAs: (value: string) => Number(value)
                        })}
                      />
                      </InputGroup>
                    </NumberInput.Root>
                  </Field>
                  <Field
                    required
                    invalid={!!errors.gift?.price_eur}
                    errorText={errors.gift?.price_eur?.message}
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
                        {...register("gift.price_eur", {
                          required: "Price in euros is required.",
                          setValueAs: (value: string) => Number(value)
                        })}
                      />
                      </InputGroup>
                    </NumberInput.Root>
                  </Field>

                    <GridItem />
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
                      <FileUpload.HiddenInput />
                      <FileUpload.Dropzone minH="8rem" w="full">
                        <LuUpload />
                        <FileUpload.DropzoneContent>
                          <Box>Drag and drop up to 20 images</Box>
                          <Box color="fg.muted">PNG, JPG up to 5MB</Box>
                        </FileUpload.DropzoneContent>
                      </FileUpload.Dropzone>
                      
                      <FileUpload.ItemGroup>
                        {fileUpload.acceptedFiles.length > 0 && (
                          <ImagesOrderingContainer
                            fileUpload={fileUpload}
                          />
                        )}
                      </FileUpload.ItemGroup>
  
                    </FileUpload.RootProvider>
                  </FileUpload.Root>
                </Field>
                
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

export default AddGift
