import { useTranslation } from "react-i18next"
import { ReactNode } from "react"

interface BaseSwitchLocalizationProps {
  children: (params: {
    t: ReturnType<typeof useTranslation>["t"]
    language: string
    toggleLanguage: () => void
  }) => ReactNode
}

const BaseSwitchLocalization = ({ children }: BaseSwitchLocalizationProps) => {
  const { t, i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "uk" : "en")
  }

  return <>{children({ t, language: i18n.language, toggleLanguage })}</>
}

export default BaseSwitchLocalization