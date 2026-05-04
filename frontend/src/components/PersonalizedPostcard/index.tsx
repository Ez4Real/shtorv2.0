import { Badge, Box, Button, Checkbox, createListCollection, FileUpload, FileUploadRootProvider, Flex, Select, Textarea, useFileUpload } from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { t } from "i18next"
import { Controller, useFormContext } from "react-hook-form"
import { BsPostcard } from "react-icons/bs"
import { useEffect } from "react"
import { LuFileImage, LuTrash2 } from "react-icons/lu"

interface PersonalizedPostcardProps {}

const PersonalizedPostcard = ({}: PersonalizedPostcardProps) => {
    const {
        register,
        control,
        watch,
        setValue,
        formState: { errors }
    } = useFormContext()

    const applyPersonalizedPostcard = watch("order.personalized_postcard")

    const languages = createListCollection({
        items: [
            { label: "English", value: "en" },
            { label: "Українська", value: "uk" }
        ],
    })

    useEffect(() => {
        if (!applyPersonalizedPostcard) {
            setValue("order.personalized_postcard", null)
        }
    }, [applyPersonalizedPostcard, setValue])

    const fileUpload = useFileUpload({ maxFiles: 1, maxFileSize: 5242880 })

    useEffect(() => {
        if (fileUpload.acceptedFiles.length > 0) {
            setValue("postcard_image", fileUpload.acceptedFiles[0], { shouldValidate: true })
        }

    }, [fileUpload.acceptedFiles])

    useEffect(() => {
        register("postcard_image", {
            validate: (value) => {
                if (applyPersonalizedPostcard && !value) {
                    return "Checkout.personalizedPostcard.image.required"
                }
                return true
            }
        })
    }, [register, applyPersonalizedPostcard])

    const handleRemoveImg = () => {
        fileUpload.clearFiles()
        setValue(
            "postcard_image",
            undefined as unknown as File,
            { shouldValidate: true }
        )
    }

    return (
        <Controller
            control={control}
            name="order.personalized_postcard"
            render={() => (
                <>
                    <Checkbox.Root
                        mt={["10px", "10px", "12px", "12px"]}
                        gap="2px"
                        id="order.personalized_postcard"
                        {...register("order.personalized_postcard", {
                        })}
                    >

                        <Checkbox.HiddenInput />
                        <Checkbox.Control
                            boxSize={["16px", "16px", "20px", "20px"]}
                            m="4px"
                            p="1px"
                            rounded="4px"
                            colorPalette="teal"
                            color={applyPersonalizedPostcard ? "white" : "black"}
                        >
                            <BsPostcard />
                        </Checkbox.Control >
                        <Checkbox.Label
                            fontWeight="300"
                        >
                            {t("Checkout.personalizedPostcard.label")} <Badge
                                fontSize="10px"
                                opacity='.75'
                            >
                                {t("Checkout.personalizedPostcard.free")}
                            </Badge>
                        </Checkbox.Label>
                    </Checkbox.Root>

                    <Flex
                        display={applyPersonalizedPostcard ? "flex" : "none"}
                        w="100%"
                        direction={["column", "row", "row", "row"]}
                        gap="8px"
                        mt={["10px", "10px", "12px", "12px"]}
                    >
                        <Box w="100%">
                            <Field
                                required={applyPersonalizedPostcard}
                                //@ts-ignore
                                errorText={errors.postcard_image?.message
                                    //@ts-ignore
                                    ? t(errors.postcard_image?.message)
                                    : undefined
                                }
                                invalid={!!errors.postcard_image}
                            >
                                <FileUploadRootProvider value={fileUpload} >
                                    <FileUpload.HiddenInput />
                                    <FileUpload.Trigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            display={fileUpload.acceptedFiles.length ? "none" : "flex-inline"}
                                            borderColor={errors.postcard_image ? "red.500" : "gray.200"}
                                        >
                                            <LuFileImage />
                                            {t("Checkout.personalizedPostcard.image.label")}
                                        </Button>
                                    </FileUpload.Trigger>

                                    <FileUpload.ItemGroup w="auto">
                                        {fileUpload.acceptedFiles.length > 0 && (
                                            <FileUpload.Item
                                                file={fileUpload.acceptedFiles[0]}
                                                p={0}
                                                rounded="md"
                                            >
                                                <Box>
                                                    <FileUpload.ItemPreviewImage
                                                        w="100%"
                                                        h="100%"
                                                        maxH={["unset", "20rem", "20rem", "20rem"]}
                                                        rounded="md"
                                                    />
                                                </Box>

                                                <FileUpload.ItemDeleteTrigger
                                                    right={0}
                                                    onClick={handleRemoveImg}
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
                                    </FileUpload.ItemGroup>
                                </FileUploadRootProvider>
                            </Field>
                        </Box>
                        <Box
                            w="100%"
                        >
                            <Field
                                //@ts-ignore
                                invalid={!!errors.order?.personalized_postcard?.content}
                                //@ts-ignore
                                errorText={errors.order?.personalized_postcard?.content?.message
                                    //@ts-ignore
                                    ? t(errors.order.personalized_postcard.content.message)
                                    : undefined
                                }
                            >
                                <Textarea
                                    id="order.personalized_postcard.content"
                                    {...register("order.personalized_postcard.content", {
                                        validate: (value) => {
                                            if (applyPersonalizedPostcard && !value?.trim()) {
                                                return "Checkout.personalizedPostcard.content.required";
                                            }
                                            return true
                                        }
                                    })}
                                    placeholder={t("Checkout.personalizedPostcard.content.placeholder")}
                                    minHeight="2.5rem"
                                    maxHeight="12rem"
                                    fontSize="12px"
                                    maxLength={600}
                                />
                            </Field>
                            <Field
                                //@ts-ignore
                                invalid={!!errors.order?.personalized_postcard?.language}
                                //@ts-ignore
                                errorText={errors.order?.personalized_postcard?.language?.message
                                    //@ts-ignore
                                    ? t(errors.order.personalized_postcard.language.message)
                                    : undefined
                                }
                                mt="6px"
                            >
                                <Select.Root
                                    collection={languages}
                                    id="order.personalized_postcard.language"
                                    {...register("order.personalized_postcard.language", {
                                        validate: (value) => {
                                            if (applyPersonalizedPostcard && !value) {
                                                return "Checkout.personalizedPostcard.language.required";
                                            }
                                            return true;
                                        }
                                    })}
                                    size="sm"
                                    width="full"
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <Select.Trigger>
                                            <Select.ValueText
                                                placeholder={t("Checkout.personalizedPostcard.language.placeholder")}
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
                            </Field>
                        </Box>
                    </Flex>
                </>
            )}
        />

    )
}

export default PersonalizedPostcard