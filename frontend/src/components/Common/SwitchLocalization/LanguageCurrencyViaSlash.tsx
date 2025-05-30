import { Text } from "@chakra-ui/react"
import BaseSwitchLocalization from "."

const SwitchLocalizationSlash = () => {
  return (
    <BaseSwitchLocalization>
      {({ t, toggleLanguage }) => (
        <Text
          fontSize="20px"
          lineHeight="25px"
          w="85px"
          textAlign="end"
          onClick={toggleLanguage}
        >{t("Locale.language")}/{t("Locale.currency")}
        </Text>
      )}
    </BaseSwitchLocalization>
  )
}

export default SwitchLocalizationSlash