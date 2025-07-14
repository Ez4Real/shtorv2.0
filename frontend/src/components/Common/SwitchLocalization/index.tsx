import { useTranslation } from "react-i18next"
import { ReactNode } from "react"
import { Currency, CurrencyCode, useCurrency } from "@/contexts/CurrencyContext"

type Language = "en" | "uk"
export type TranslatableTitle = `title_${Language}`
export type TranslatablePrice = `price_${CurrencyCode}`;
export type TranslatableDescription = `description_${Language}`

interface BaseSwitchLocalizationProps {
  children: (params: {
    t: ReturnType<typeof useTranslation>["t"]
    language: Language
    toggleLanguage: () => void
    currency: Currency
    toggleCurrency: () => void
  }) => ReactNode
}

const BaseSwitchLocalization = ({ children }: BaseSwitchLocalizationProps) => {
  const { t, i18n } = useTranslation()
  const { currency, toggleCurrency } = useCurrency()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "uk" : "en")
  }

  return <>{children({
    t,
    language: i18n.language as Language,
    toggleLanguage,
    currency: currency,
    toggleCurrency
  })}</>
}

export default BaseSwitchLocalization