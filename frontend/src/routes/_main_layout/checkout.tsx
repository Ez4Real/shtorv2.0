import {
  ApiError,
  OrderBasketItem_Output,
  OpenAPI,
  OrderCreate,
  OrdersService,
  ShippingMethods,
  PaymentCreate,
  PaymentsService,
  PaymentBasketItem
} from "@/client"
import ProductCounter from "@/components/Common/ProductCounter"
import { TranslatableDescription,
  TranslatablePrice,
  TranslatableTitle } from "@/components/Common/SwitchLocalization"
import { InputGroup } from "@/components/ui/input-group"
import { useCart } from "@/contexts/CartContext"
import { getCurrencyCode, useCurrency } from "@/contexts/CurrencyContext"
import useCustomToast from "@/hooks/useCustomToast"
import { getItemPrice, handleError } from "@/utils"
import { Box, Button, Checkbox, Container, createListCollection, Flex, Grid, Image, Input, Mark, Portal, RadioGroup, Select, StackSeparator, Text, VStack } from "@chakra-ui/react"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { createFileRoute } from "@tanstack/react-router"
import axios from "axios"
import { Field } from "@/components/ui/field"
import { useEffect, useMemo, useState } from "react"
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { FiMail, FiSearch } from "react-icons/fi"


export const Route = createFileRoute("/_main_layout/checkout")({
  component: Checkout,
})


function Checkout() {
  const { t, i18n } = useTranslation()
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([])
  const { items, getCartTotal, clearCart } = useCart() 
  const { currency } = useCurrency() 
  const navigate = useNavigate()
  const [suite, setSuite] = useState<boolean>(false)
  const [billing, setBilling] = useState<string>("same")
  const titleKey = `title_${i18n.language}` as TranslatableTitle
  const descriptionKey = `description_${i18n.language}` as TranslatableDescription
  const subtotal = getCartTotal(currency)
  const delivery = {
    "uah": 1500,
    "usd": 45,
    "eur": 45,
  }
  
  const { showSuccessToast } = useCustomToast()

  const getDeliveryCost = (method: string): number => {
    return method === "nova_post" ? 0 : delivery[currency.code]
  }

  const methods = useForm<OrderCreate>({
    mode: "onBlur",
    criteriaMode: "all",
    shouldUnregister: false,
    defaultValues: {
      email: "",
      delivery_address: {
        country: "",
        first_name: "",
        last_name: "",
        address: "",
        postal_code: "",
        city: "",
        phone: "",
      },
      billing_address: {
        country: "",
        first_name: "",
        last_name: "",
        address: "",
        postal_code: "",
        city: "",
        phone: "",
      },
      shipping_method: "ups_express",
      mailing: false,
      comment: "",
      payment_status: "created",
      amount: subtotal + getDeliveryCost("ups_express"),
      currency: currency.code,
      basketOrder: items
    },
  })

  
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors, isValid, isSubmitting },
  } = methods

  const shippingMethod = watch("shipping_method")
  const amount = watch("amount")
  const ccy = watch("currency")
  const email = watch("email")
  const basketOrder = watch("basketOrder")

  function mapCartItemsToExportStructure(
    items: OrderBasketItem_Output[]
  ): PaymentBasketItem[] {
    const priceKey = `price_${currency.code}` as TranslatablePrice
    const titleKey = `title_${i18n.language}` as TranslatableTitle;

    return items.map((item): PaymentBasketItem => {
      const base = item.data[priceKey] ?? 0
      const extra =
        item.data.type === 'product' && item.data.attachment
          ? item.data.attachment[priceKey] ?? 0
          : 0
      const sum = (base + extra) * 100
      const total = sum * (item.qty ?? 1)

      return {
        icon: item.icon,
        unit: 'шт.',
        code: item.code,
        qty: item.qty ?? 1,
        name: item.data[titleKey],
        sum,
        total,
      }
    })
  }

  
  const serialisePaymentData = (): PaymentCreate => ({
    amount: amount * 100, // 1
    ccy: getCurrencyCode(ccy), // 980
    merchantPaymInfo: {
      reference: crypto.randomUUID(),
      destination: "test payment",
      customerEmails: email ? [email] : [],
      basketOrder: mapCartItemsToExportStructure(basketOrder),
    },
    webHookUrl: `${OpenAPI.BASE}/api/v1/payments/callback`,
    redirectUrl: "http://localhost:5173/thank-you",
  }) 


  const mutation = useMutation({
    mutationFn: async (data: OrderCreate) => {
      try {
        const paymentResponse = await PaymentsService.createPayment({
          requestBody: serialisePaymentData(),
        })

        const orderData = { ...data, invoiceId: paymentResponse.invoiceId }
        const orderResponse = await OrdersService.createOrder({
          requestBody: orderData,
        })

        window.open(paymentResponse.pageUrl, "_blank", "noopener,noreferrer")
        // window.location.href = paymentResponse.pageUrl;

        return orderResponse
      } catch (error) {
        console.error("❌ Error:", error)
        throw error
      }
    },
    onSuccess: () => {
      showSuccessToast(t("Checkout.success"))
      reset()
      clearCart()
    },
    onError: (err: ApiError) => {
      handleError(err)
    },
  })

  const onSubmit: SubmitHandler<OrderCreate> = (data) => {
    mutation.mutate(data)
  }


  useEffect(() => {
    setValue("amount", subtotal + getDeliveryCost(shippingMethod))
  }, [shippingMethod, subtotal, currency])

  
  useEffect(() => {
    setValue("currency", currency.code)
  }, [currency])

  useEffect(() => {
    if (billing === "same") {
      setValue("billing_address", null);
    }
  }, [billing]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,cca2")
    
      const countriesToExclude = ["RU", "BY"]
      const countryList = response.data
        .filter((country: any) => !countriesToExclude.includes(country.cca2))
        .map((country: any) => ({
          value: country.cca2,
          label: country.name.common,
        }))
        .sort((a: any, b: any) => a.label.localeCompare(b.label))

      setCountries(countryList)
    }

    fetchCountries()
  }, [])


  const memoizedCountryOptions = useMemo(() => countries, [countries])
  const countryCollection = createListCollection({
    items: [
      ...memoizedCountryOptions
    ],
  })

  const billingAdress = [
    { value: "same", label: t("Checkout.billingAddress.same")},
    { value: "different", label: t("Checkout.billingAddress.different") },
  ]

  const shippings = [
    { value: "ups_express", label: "UPS EXPRESS", price: "$45"},
    { value: "nova_post", label: "NOVA POST",  price: "Free"},
  ]

  useEffect(() => {
    if (items.length === 0) {
      navigate({
        from: "/checkout",
        to: "/shop",
        search: { page: 1 },
        hash: "root"
      })
    }
  }, [items, navigate])

  return (
    <Container
      maxW="100vw"
      mb="238px"
      p={0}
      paddingInline={["16px", "16px", "46px", "46px"]}
    > 
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gapX={["0", "0", "172px", "172px"]}
          >
            <VStack
              alignItems="flex-start"
              gap={0}
            >
              <Text
                fontSize="24px"
                lineHeight="30px"
                fontWeight={["400", "400", "300", "300"]}
              >
                {t("Checkout.contact.title")}
              </Text>
            
              <Field
                required
                invalid={!!errors.email}
                errorText={errors.email?.message}
                w="100%"
                mt={["12px", "12px", "16px", "16px"]}
              >
                <Input
                  id="email"
                  {...register("email", {
                    required: t("Checkout.emailRequired")
                  })}
                  type="email"
                  placeholder="Email"
                  borderColor="ui.greyBorder"
                  h="42px"
                />
              </Field>

              <Controller
                control={control}
                name="mailing"
                render={({ field }) => (
                  <Field
                    invalid={!!errors.mailing}
                    errorText={errors.mailing?.message}
                    disabled={field.disabled}
                  >
                    <Checkbox.Root
                      checked={field.value}
                      onCheckedChange={({ checked }) => field.onChange(checked)}
                      mt={["10px", "10px", "12px", "12px"]}
                      gap="2px"
                    >
                      <Checkbox.HiddenInput />
                      <Checkbox.Control
                        boxSize={["12px", "12px", "16px", "16px"]}
                        m="4px"
                      >
                        <FiMail />
                      </Checkbox.Control >
                      <Checkbox.Label
                        fontWeight="300"
                      >
                        {t("Checkout.contact.newsletter")}
                      </Checkbox.Label>
                    </Checkbox.Root>
                  </Field>
                )}
              />

              <Text
                mt="24px"
                fontSize="24px"
                lineHeight="30px"
                fontWeight={["400", "400", "300", "300"]}
              >
                {t("Checkout.delivery.title")}
              </Text>

              <Field
                invalid={!!errors.delivery_address?.country}
                errorText={errors.delivery_address?.country?.message}
                mt={["12px", "12px", "16px", "16px"]}
              >
                <Controller
                  control={control}
                  name="delivery_address.country"
                  rules={{ required: t("Checkout.countryRequired") }}
                  render={({ field }) => (
                    <Select.Root
                      name={field.name}
                      onValueChange={(e) => {
                        field.onChange(e.items?.[0]?.label)
                        field.onBlur()
                      }}
                      onInteractOutside={() => field.onBlur()}
                      collection={countryCollection}
                    >
                      <Select.HiddenSelect />
                      <Select.Control>
                        <Select.Trigger borderColor="ui.greyBorder">
                          <Select.ValueText
                            placeholder={t("Checkout.delivery.country")}
                          />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                          <Select.Indicator />
                        </Select.IndicatorGroup>
                      </Select.Control>
                      <Portal>
                        <Select.Positioner>
                          <Select.Content>
                            {countries.map((framework) => (
                              <Select.Item item={framework} key={framework.value}>
                                {framework.label}
                                <Select.ItemIndicator />
                              </Select.Item>
                            ))}
                          </Select.Content>
                        </Select.Positioner>
                      </Portal>
                    </Select.Root>
                  )}
                />
              </Field>
              
              <Flex
                w="100%"
                direction={["column", "column", "row", "row"]}
                gap="8px"
                mt={["10px", "10px", "12px", "12px"]}
              >
                <Field
                  required
                  invalid={!!errors.delivery_address?.first_name}
                  errorText={errors.delivery_address?.first_name?.message}
                  w="100%"
                >
                  <Input
                    id="delivery_address.first_name"
                    {...register("delivery_address.first_name", {
                      required: t("Checkout.firstNameRequired")
                    })}
                    placeholder={t("Checkout.delivery.firstName")}
                    borderColor="ui.greyBorder"
                    type="text"
                    h="42px"
                  />
                </Field>
                <Field
                  required
                  invalid={!!errors.delivery_address?.last_name}
                  errorText={errors.delivery_address?.last_name?.message}
                  w="100%"
                >
                  <Input
                    id="delivery_address.last_name"
                    {...register("delivery_address.last_name", {
                      required: t("Checkout.lastNameRequired")
                    })}
                    placeholder={t("Checkout.delivery.lastName")}
                    borderColor="ui.greyBorder"
                    type="text"
                    h="42px"
                  />
                </Field>
              </Flex>

              <Field
                required
                invalid={!!errors.delivery_address?.address}
                errorText={errors.delivery_address?.address?.message}
                mt={["10px", "10px", "12px", "12px"]}
              >
                <InputGroup
                  endElement={<FiSearch />}
                  w="full"
                >
                  <Input
                    id="delivery_address.address"
                    {...register("delivery_address.address", {
                      required: t("Checkout.addressRequired")
                    })}
                    placeholder={t("Checkout.delivery.address")}
                    type="text"
                    borderColor="ui.greyBorder"
                    h="42px"
                  
                  />
                </InputGroup>
              </Field>

              
              { suite ? (
                <Field
                  invalid={!!errors.delivery_address?.additional}
                  errorText={errors.delivery_address?.additional?.message}
                  w="100%"
                  mt={["10px", "10px", "12px", "12px"]}
                >
                  <Input
                    id="delivery_address.additional"
                    {...register("delivery_address.additional")}
                    placeholder={t("Checkout.delivery.suite")}
                    borderColor="ui.greyBorder"
                    type="text"
                    h="42px"
                  />
                </Field>
              ) : (
                <Button
                  mt={["10px", "10px", "12px", "12px"]}
                  variant="plain"
                  w="auto"
                  h="24px"
                  gapX="2px"
                  paddingInline="4px"
                  fontWeight="300"
                  onClick={() =>  setSuite(true)}
                >
                  <Box p="7px">
                    <Image src="/assets/icons/add.svg" boxSize="10px"/>
                  </Box>
                  {t("Checkout.delivery.addSuite")}
                </Button>
              )}

              <Flex
                w="100%"
                direction={["column", "column", "row", "row"]}
                gap="8px"
                mt={["10px", "10px", "12px", "12px"]}
              >
                <Field
                  required
                  invalid={!!errors.delivery_address?.postal_code}
                  errorText={errors.delivery_address?.postal_code?.message}
                  w="100%"
                >
                  <Input
                    id="delivery_address.postal_code"
                    {...register("delivery_address.postal_code", {
                      required: t("Checkout.postalCodeRequired")
                    })}
                    placeholder={t("Checkout.delivery.postalCode")}
                    borderColor="ui.greyBorder"
                    type="text"
                    h="42px"
                  />
                </Field>
                <Field
                  invalid={!!errors.delivery_address?.city}
                  errorText={errors.delivery_address?.city?.message}
                  w="100%"
                >
                  <Input
                    id="delivery_address.city"
                    {...register("delivery_address.city", {
                      required: t("Checkout.cityRequired")
                    })}
                    placeholder={t("Checkout.delivery.city")}
                    borderColor="ui.greyBorder"
                    type="text"
                    h="42px"
                  />
                </Field>
              </Flex>

              <Field
                invalid={!!errors.delivery_address?.phone}
                errorText={errors.delivery_address?.phone?.message}
                w="100%"
                mt={["10px", "10px", "12px", "12px"]}
              >
                <Input
                  id="delivery_address.phone"
                  {...register("delivery_address.phone", {
                    required: t("Checkout.phoneRequired"),
                    minLength: 7,
                    maxLength: 20
                  })}
                  placeholder={t("Checkout.delivery.phone")}
                  borderColor="ui.greyBorder"
                  type="text"
                  h="42px"
                />
              </Field>

              <VStack 
                w="full"
                alignItems="flex-start"
              >
                <Text
                  fontSize="24px"
                  lineHeight="30px"
                  mt={["16px", "16px", "24px", "24px"]}
                >
                  {t("Checkout.shippingMethod")}
                </Text>
                
                <Controller
                  name="shipping_method"
                  control={control}
                  render={({ field }) => (
                  <RadioGroup.Root
                    w="100%"
                    variant="subtle"
                    mt="12px"
                    name={field.name}
                    value={field.value}
                    onValueChange={({ value }) => {
                      setValue("shipping_method", value as ShippingMethods)
                    }}
                    defaultValue="ups_express"
                    
                  >
                    <VStack
                      separator={
                        <StackSeparator marginBlock="0 !important"/>
                      }
                      alignItems="flex-start"
                      gap="6"
                      border=".5px solid #3A3A3A"
                      borderRadius="4px"
                    >
                      {shippings.map((shipping) => (
                        <RadioGroup.Item
                          w="100%"
                          key={shipping.value}
                          value={shipping.value} 
                          p="10px 12px"
                          border="none"
                          borderRadius="inherit"
                          _checked={{
                            bg: "ui.lightBlue"
                          }}
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator 
                            border="1px solid black"
                            boxSize="10px"
                            bg="transparent"
                          />
                          <RadioGroup.ItemText
                            w="full"
                            display="flex"
                            justifyContent="space-between"
                            fontWeight="300"
                          >
                            <Text>{shipping.label}</Text>
                            <Text>{shipping.price}</Text>
                          </RadioGroup.ItemText>
                        </RadioGroup.Item>
                      ))}
                    </VStack>
                  </RadioGroup.Root>
                )}
                />
              </VStack>

              <VStack>
                <Text
                  fontSize="24px"
                  lineHeight="30px"
                  mt={["16px", "16px", "24px", "24px"]}
                >
                  {t("Checkout.billingAddress.title")}
                </Text>
              </VStack>
                <RadioGroup.Root
                  w="100%"
                  variant="subtle"
                  mt="12px"
                  onValueChange={({ value }) => {
                    setBilling(value)
                  }}
                  defaultValue="same"
                  
                >
                  <VStack
                    separator={
                      <StackSeparator marginBlock="0 !important"/>
                    }
                    alignItems="flex-start"
                    gap="6"
                    border=".5px solid #3A3A3A"
                    borderTopRadius="4px"
                    borderBottomRadius={billing==="different" ? "0" : "4px"}
                  >
                    {billingAdress.map((item) => (
                      <RadioGroup.Item
                        w="100%"
                        key={item.value}
                        value={item.value} 
                        p="10px 12px"
                        border="none"
                        borderRadius="inherit"
                        _checked={{
                          bg: "ui.lightBlue"
                        }}
                      >
                        <RadioGroup.ItemHiddenInput/>
                        <RadioGroup.ItemIndicator 
                          border="1px solid black"
                          boxSize="10px"
                          bg="transparent"
                        />
                        <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </VStack>
                </RadioGroup.Root>

                    { billing==="different" &&
                      <VStack
                        bg="ui.lightBlue"
                        p="12px"
                        w="full"
                        gap={["10px", "10px", "12px", "12px"]}
                        alignItems="flex-start"
                        border="1px solid #DEDEDE"
                        borderTopRadius={0}
                        borderBottomRadius="6px"
                        
                      >
                        <Field
                          invalid={!!errors.billing_address?.country}
                          errorText={errors.billing_address?.country?.message}
                          mt={["12px", "12px", "16px", "16px"]}
                        >
                          <Controller
                            control={control}
                            name="billing_address.country"
                            rules={{ required: t("Checkout.countryRequired") }}
                            render={({ field }) => (
                              <Select.Root
                                name={field.name}
                                onValueChange={(e) => {
                                  field.onChange(e.items?.[0]?.label)
                                  field.onBlur()
                                }}
                                onInteractOutside={() => field.onBlur()}
                                collection={countryCollection}
                              >
                                <Select.HiddenSelect />
                                <Select.Control>
                                  <Select.Trigger
                                    bg="white"
                                    borderColor="ui.greyBorder"
                                  >
                                    <Select.ValueText
                                      placeholder={t("Checkout.delivery.country")}
                                    />
                                  </Select.Trigger>
                                  <Select.IndicatorGroup>
                                    <Select.Indicator />
                                  </Select.IndicatorGroup>
                                </Select.Control>
                                <Portal>
                                  <Select.Positioner>
                                    <Select.Content>
                                      {countries.map((framework) => (
                                        <Select.Item item={framework} key={framework.value}>
                                          {framework.label}
                                          <Select.ItemIndicator />
                                        </Select.Item>
                                      ))}
                                    </Select.Content>
                                  </Select.Positioner>
                                </Portal>
                              </Select.Root>
                            )}
                          />
                        </Field>
                        
                        <Flex
                          w="100%"
                          direction={["column", "column", "row", "row"]}
                          gap="8px"
                        >
                          <Field
                            required
                            invalid={!!errors.billing_address?.first_name}
                            errorText={errors.billing_address?.first_name?.message}
                            w="100%"
                          >
                            <Input
                              id="billing_address.first_name"
                              {...register("billing_address.first_name", {
                                required: t("Checkout.firstNameRequired")
                              })}
                              variant="subtle"
                              placeholder={t("Checkout.delivery.firstName")}
                              border=".5px solid"
                              borderColor="ui.greyBorder"
                              borderRadius="4px"
                              type="text"
                              h="42px"
                            />
                          </Field>
                          <Field
                            invalid={!!errors.billing_address?.last_name}
                            errorText={errors.billing_address?.last_name?.message}
                            w="100%"
                          >
                            <Input
                              id="billing_address.last_name"
                              {...register("billing_address.last_name", {
                                required: t("Checkout.lastNameRequired")
                              })}
                              variant="subtle"
                              placeholder={t("Checkout.delivery.lastName")}
                              border=".5px solid"
                              borderColor="ui.greyBorder"
                              borderRadius="4px"
                              type="text"
                              h="42px"
                            />
                          </Field>
                        </Flex>

                        <Field
                          required
                          invalid={!!errors.billing_address?.address}
                          errorText={errors.billing_address?.address?.message}
                        >
                          <InputGroup
                            endElement={<FiSearch />}
                            w="full"
                          >
                            <Input
                              id="billing_address.address"
                              {...register("billing_address.address", {
                                required: t("Checkout.addressRequired")
                              })}
                              variant="subtle"
                              placeholder={t("Checkout.delivery.address")}
                              type="text"
                              h="42px"
                              border=".5px solid"
                              borderColor="ui.greyBorder"
                              borderRadius="4px"
                            
                            />
                          </InputGroup>
                        </Field>

                        { suite ? (
                          <Field
                            invalid={!!errors.billing_address?.additional}
                            errorText={errors.billing_address?.additional?.message}
                            w="100%"
                          >
                            <Input
                              id="billing_address.additional"
                              {...register("billing_address.additional")}
                              variant="subtle"
                              placeholder={t("Checkout.delivery.suite")}
                              border=".5px solid"
                              borderColor="ui.greyBorder"
                              borderRadius="4px"
                              type="text"
                              h="42px"
                            />
                          </Field>
                        ) : (
                          <Button
                            variant="plain"
                            w="auto"
                            h="24px"
                            gapX="2px"
                            paddingInline="4px"
                            fontWeight="300"
                            onClick={() =>  setSuite(true)}
                          >
                            <Box p="7px">
                              <Image src="/assets/icons/add.svg" boxSize="10px"/>
                            </Box>
                            {t("Checkout.delivery.addSuite")}
                          </Button>
                        )}

                        <Flex
                          w="100%"
                          direction={["column", "column", "row", "row"]}
                          gap="8px"
                        >
                          <Field
                            required
                            invalid={!!errors.billing_address?.postal_code}
                            errorText={errors.billing_address?.postal_code?.message}
                            w="100%"
                          >
                            <Input
                              id="billing_address.postal_code"
                              {...register("billing_address.postal_code", {
                                required: t("Checkout.postalCodeRequired")
                              })}
                              variant="subtle"
                              placeholder={t("Checkout.delivery.postalCode")}
                              border=".5px solid"
                              borderColor="ui.greyBorder"
                              borderRadius="4px"
                              type="text"
                              h="42px"
                            />
                          </Field>
                          <Field
                            required
                            invalid={!!errors.billing_address?.city}
                            errorText={errors.billing_address?.city?.message}
                            w="100%"
                          >
                            <Input
                              id="billing_address.city"
                              {...register("billing_address.city", {
                                required: t("Checkout.cityRequired")
                              })}
                              variant="subtle"
                              placeholder={t("Checkout.delivery.city")}
                              border=".5px solid"
                              borderColor="ui.greyBorder"
                              borderRadius="4px"
                              type="text"
                              h="42px"
                            />
                          </Field>
                        </Flex>

                        <Field
                          required
                          invalid={!!errors.billing_address?.phone}
                          errorText={errors.billing_address?.phone?.message}
                          w="100%"
                        >
                          <Input
                            id="billing_address.phone"
                            {...register("billing_address.phone", {
                              required: t("Checkout.phoneRequired")
                            })}
                            variant="subtle"
                            placeholder={t("Checkout.delivery.phone")}
                            border=".5px solid"
                            borderColor="ui.greyBorder"
                            borderRadius="4px"
                            type="text"
                            h="42px"
                          />
                        </Field>

                      </VStack>
                    }

            </VStack>
            <VStack
              alignItems="flex-start"
              gap={0}
              mt={["36px", "36px", "36px", "0"]}
            >
              <Text
                fontSize="24px"
                lineHeight="30px"
                fontWeight={["400", "400", "300", "300"]}
              >
                {t("Checkout.orderSummary.title")}
              </Text>
              { items.map((item: OrderBasketItem_Output, index) => (
                <Flex
                  w="full"
                  key={index}
                  mt={["24px", "24px", "24px", "16px"]}
                  gap="16px"
                >
                  <Image
                    src={`${OpenAPI.BASE}/media/${item.data.images[0].url}`}
                    maxH="224px"
                  >

                  </Image>
                  <VStack
                    w="full"
                    alignItems="flex-start"
                    justifyContent="space-between"
                  >
                    <VStack 
                      alignItems="flex-start"
                      gap={0}
                    >
                      <Text>
                        {item.data.type === 'product' && `${item.data.category[titleKey]}/ `}
                        {item.data[titleKey]}
                      </Text>
                      {item.data.type === 'product' && (
                        <Text 
                          mt={["8px", "8px", "16px", "16px"]}
                        >
                          {item.data[descriptionKey]}
                        </Text>
                      )}
                      <Box mt={["8px", "8px", "16px", "16px"]}>
                        {item.data.type === "product" && item.data.size && (  
                          <Text>
                            {t("Checkout.size")}: {item.data.size}
                          </Text>
                        )}
                      </Box>

                    </VStack>
                    <Flex
                      w="full"
                      justifyContent="space-between"
                    >
                      <ProductCounter
                        count={item.qty}
                        cartItemId={item.id}
                      />
                      <Text>{currency.symbol}{getItemPrice(item.data, currency, item.qty)}</Text>
                    </Flex>
                  </VStack>
                </Flex>
              ))}

              <VStack
                alignItems="flex-start"
                w="100%"
                mt={["24px", "24px", "60px", "60px"]}
              >
                <Flex
                  justifyContent="space-between"
                  w="full"
                  fontSize="16px"
                >
                  <Box>{t("Checkout.orderSummary.subtotal")}</Box>
                  <Box>{t("CartDialog.total")}: {currency.symbol + subtotal}</Box>
                </Flex>
                <Flex
                  justifyContent="space-between"
                  w="full"
                  fontSize="16px"
                >
                  <Box>{t("Checkout.orderSummary.shipping")}</Box>
                  <Box>{shippingMethod === "ups_express"
                    ? ( 
                      currency.symbol + getDeliveryCost(shippingMethod)
                    ) : (
                      <>{t("Checkout.orderSummary.freeDelivery")}</>
                    )}
                  </Box>
                </Flex>
                <Flex
                  justifyContent="space-between"
                  w="full"
                  fontSize="18px"
                >
                  <Box>{t("Checkout.orderSummary.total")}</Box>
                  <Flex 
                    alignItems="center"
                    gap="6px"
                  >
                    <Mark
                      color="#BBBBBB"
                      fontSize={["12px", "12px", "14px", "14px", ]}
                      textTransform="uppercase"
                    >
                      {currency.code}
                    </Mark>
                    {currency.symbol}
                    {subtotal + getDeliveryCost(shippingMethod)}
                  </Flex>
                </Flex>
              </VStack>
            </VStack>
          </Grid>

          <Grid
            templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
            gapX={["0", "0", "172px", "172px"]}
          >
            <Button
              type="submit"
              disabled={!isValid}
              loading={isSubmitting}
              w="100%"
              mt={["24px", "24px", "24px", "33px"]}
            >
              {t("Checkout.reviewOrder")}
            </Button>
          </Grid>
        </form>
      </FormProvider>
    </Container>
  )
}
