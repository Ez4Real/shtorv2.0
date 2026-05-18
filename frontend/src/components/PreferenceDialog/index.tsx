import { useCurrency, CurrencyCode, currencyList } from "@/contexts/CurrencyContext"
import i18n from "@/i18n"
import {
    Button,
    Dialog,
    Flex,
    HStack,
    Portal,
    SegmentGroup,
    Text,
    VStack,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

type Language = "en" | "uk"

interface PreferenceDialogProps {}

const PreferenceDialog = ({ }: PreferenceDialogProps) => {
    const PREFERENCES_KEY = "preferences_initialized"
    const [open, setOpen] = useState(false)
    const {setCurrency: changeCurrency} = useCurrency()
    const [language, setLanguage] = useState<Language>("en")
    const [currency, setCurrency] = useState<CurrencyCode>("usd")
    const { t } = useTranslation()

    useEffect(() => {
      if (localStorage.getItem(PREFERENCES_KEY) as string | null !== "true") {
        setOpen(true)
      }
    }, [])

    const handleSave = () => {
        i18n.changeLanguage(language)
        changeCurrency(currencyList[currency])
        localStorage.setItem(PREFERENCES_KEY, "true")
        setOpen(false)
    }

    return (
        <HStack wrap="wrap" gap="4">
            <Dialog.Root
                placement="center"
                motionPreset="slide-in-bottom"
                closeOnInteractOutside={false}
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content
                          mx={[".5rem", ".5rem", 0, 0]}
                        >
                            <Dialog.Header>
                                <Dialog.Title>{t("PreferenceDialog.title")}</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <VStack align="stretch" gap={6}>

                                    {/* Language */}
                                    <div>
                                        <Text mb={2} fontWeight="medium">
                                            {t("PreferenceDialog.language")}
                                        </Text>

                                        <Flex
                                            justifyContent={["center", "flex-start", "flex-start", "flex-start"]}
                                        >

                                            <SegmentGroup.Root
                                                value={language}
                                                onValueChange={(e) => setLanguage(e.value as Language)}
                                                defaultValue="en"
                                                css={{
                                                    "--segment-indicator-bg": "black"
                                                }}
                                            >
                                                <SegmentGroup.Indicator />

                                                <SegmentGroup.Items
                                                    items={[
                                                        { label: "EN", value: "en" },
                                                        { label: "UA", value: "uk" },
                                                    ]}
                                                    _checked={{
                                                        color: "white"
                                                    }}
                                                />
                                            </SegmentGroup.Root>
                                        </Flex>
                                    </div>

                                    {/* Currency */}
                                    <div>
                                        <Text mb={2} fontWeight="medium">
                                            {t("PreferenceDialog.currency")}
                                        </Text>

                                        <Flex
                                            justifyContent={["center", "flex-start", "flex-start", "flex-start"]}
                                        >
                                            <SegmentGroup.Root
                                                value={currency}
                                                onValueChange={(e) => setCurrency(e.value as CurrencyCode)}
                                                defaultValue="usd"
                                                css={{
                                                    "--segment-indicator-bg": "black"
                                                }}
                                            >
                                                <SegmentGroup.Indicator />

                                                <SegmentGroup.Items
                                                    items={[
                                                        { label: "USD $", value: "usd" },
                                                        { label: "EUR €", value: "eur" },
                                                        { label: "UAH ₴", value: "uah" },
                                                    ]}
                                                    _checked={{
                                                        color: "white"
                                                    }}
                                                />
                                            </SegmentGroup.Root>
                                        </Flex>
                                    </div>

                                </VStack>
                            </Dialog.Body>

                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button
                                      variant="outline"
                                    >
                                        {t("PreferenceDialog.cancel")}
                                    </Button>
                                </Dialog.ActionTrigger>
                                <Button
                                  onClick={handleSave}
                                >
                                    {t("PreferenceDialog.save")}
                                </Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </HStack>
    )
}

export default PreferenceDialog