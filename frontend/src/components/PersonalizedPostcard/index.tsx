import { OpenAPI, ProductPublic } from "@/client"
import { useCurrency } from "@/contexts/CurrencyContext"
import { getItemPrice } from "@/utils"
import { Badge, Box, Checkbox, createListCollection, Flex, Image, Select, Text, Textarea } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { useTranslation } from "react-i18next"
import { Link as RouterLink } from "@tanstack/react-router"
import { TranslatableTitle } from "../Common/SwitchLocalization"
import { t } from "i18next"
import { Controller, useFormContext } from "react-hook-form"

import CreateBannerUploadField from "../Common/BannerUploadField/Create"
import { BsPostcard } from "react-icons/bs"
import { useEffect } from "react"

interface PersonalizedPostcardProps {
    displayProductPrice?: boolean
    titleFontSize?: string
    titleLineHeight?: string
}

const PersonalizedPostcard = ({
    displayProductPrice = true,
    titleFontSize = "24px",
    titleLineHeight = "30px"
}: PersonalizedPostcardProps) => {
    const { i18n } = useTranslation()
    const { currency } = useCurrency()

    const titleKey = `title_${i18n.language}` as TranslatableTitle

    const {
        register,
        control,
        formState: { errors, isValid, isSubmitted }
    } = useFormContext()

    const languages = createListCollection({
        items: [
            { label: "English", value: "en" },
            { label: "Українська", value: "uk" }
        ],
    })

    // useEffect(() => {
    //     log()
    // }, [])

    return (
        <>
            <Controller
                control={control}
                name="personalizedPostcard"
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
                                boxSize={["16px", "16px", "20px", "20px"]}
                                m="4px"
                                p="1px"
                                rounded="4px"
                                colorPalette="teal"
                                color={field.value ? "white" : "black"}
                            >
                                <BsPostcard />
                            </Checkbox.Control >
                            <Checkbox.Label
                                fontWeight="300"
                            >
                                {t("Checkout.contact.personalizedPostcard.label")} <Badge
                                    fontSize="10px"
                                    opacity='.75'
                                >
                                    {t("Checkout.contact.personalizedPostcard.free")}
                                </Badge>
                            </Checkbox.Label>
                        </Checkbox.Root>
                    </Field>
                )}
            />

            <Flex
                w="100%"
                direction={["column", "row", "row", "row"]}
                gap="8px"
                mt={["10px", "10px", "12px", "12px"]}
            >
                <Box w="100%">
                    <CreateBannerUploadField
                        field_id="banner_desktop"
                        label="Desktop Banner"
                        error={errors.banner_desktop?.message}
                        invalid={!!errors.banner_desktop}
                        displayLabel={false}
                        uploadButtonLabel={t("Checkout.contact.personalizedPostcard.uploadImageLabel")}
                        maxH={["unset", "20rem", "20rem", "20rem"]}
                    />
                </Box>
                <Box
                    w="100%"
                >
                    <Textarea
                        id="description_en"
                        {...register("product.description_en", {
                            required: "English description is required.",
                            // maxLength: {
                            //     value: 600,
                            //     message: "Maximum length is 600 characters.",
                            // },
                            setValueAs: (value: string) => value.trim(),
                        })}
                        placeholder={t("Checkout.contact.personalizedPostcard.contentLabel")}
                        resize="vertical"
                        minHeight="2.5rem"
                        maxHeight="12rem"
                        fontSize="12px"
                        maxLength={600}
                    />
                    <Select.Root
                        collection={languages}
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
                                  placeholder={t("Checkout.contact.personalizedPostcard.languageChoiceLabel")}
                                />
                            </Select.Trigger>
                            <Select.IndicatorGroup>
                                <Select.Indicator />
                            </Select.IndicatorGroup>
                        </Select.Control>
                        <Select.Positioner>
                            <Select.Content>
                                {languages.items.map((instance) => (
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
                </Box>
            </Flex>
        </>

    )
}

export default PersonalizedPostcard