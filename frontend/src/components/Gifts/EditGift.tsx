import {
  Button,
  ButtonGroup,
  DialogActionTrigger,
  Flex,
  Grid,
  GridItem,
  Input,
  NumberInput,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { Controller, FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import { FaExchangeAlt } from "react-icons/fa"

import { type ApiError, Body_gifts_update_gift, type GiftPublic, GiftsService } from "@/client"
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
import { InputGroup } from "../ui/input-group"

interface EditGiftProps {
  gift: GiftPublic
}

const EditGift = ({ gift }: EditGiftProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()

  const min_price = 0.9
  const max_price = 99999
  const step = .1

  const methods = useForm<Body_gifts_update_gift>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      gift: {
        ...gift
      },
      image: undefined
    }
  })

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = methods

  const mutation = useMutation({
    mutationFn: (data: Body_gifts_update_gift) =>
      GiftsService.updateGift({ id: gift.id, formData: data }),
    onSuccess: () => {
      showSuccessToast("Gift updated successfully.")
      reset()
      setIsOpen(false)
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] })
    },
  })

  const onSubmit: SubmitHandler<Body_gifts_update_gift> = async (data) => {
    mutation.mutate(data)
  }

  return (
    <DialogRoot
      size={{ base: "xs", md: "xl" }}
      placement="center"
      open={isOpen}
      onOpenChange={({ open }) => setIsOpen(open)}
    >
      <DialogTrigger asChild>
        <Button variant="ghost">
          <FaExchangeAlt fontSize="16px" />
          Edit Gift
        </Button>
      </DialogTrigger>
      <DialogContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Edit Gift</DialogTitle>
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
                            colorPalette="teal"
                            name={field.name}
                            checked={field.value as boolean | undefined}
                            onCheckedChange={({ checked }) => field.onChange(checked)}
                          >
                            <Switch.HiddenInput onBlur={field.onBlur} />
                            <Switch.Control />
                            
                          </Switch.Root>
                        </Field>
                      )}
                    />
  
                    <GridItem />

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

                <Flex 
                    gap="1rem"
                    w="100%"
                    maxH={["unset", "525px", "525px", "525px"]}
                    direction={["column", "row", "row", "row"]}
                >
                <UpdateBannerUploadField
                  field_id="image"
                  label="Image"
                  currentBannerUrl={gift.image.url}
                  error={errors.image?.message}
                  invalid={!!errors.image}
                />
                </Flex>
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

export default EditGift
