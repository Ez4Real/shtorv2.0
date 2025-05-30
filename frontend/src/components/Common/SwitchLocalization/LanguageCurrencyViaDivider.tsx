import { Box } from "@chakra-ui/react"
import BaseSwitchLocalization from "."

const SwitchLocalizationDivider = () => {
  return (
    <BaseSwitchLocalization>
      {({ t, toggleLanguage }) => (
        <Box
          fontSize="16px"
          fontWeight="300"
          cursor="pointer"
          textAlign="center"
          onClick={toggleLanguage}
          w="35px"
        >
          <Box borderBottom="1px solid">
            {t("Locale.language")}
          </Box>
          <Box className="currency">{t("Locale.currency")}</Box>
        </Box>
      )}
    </BaseSwitchLocalization>
  )
}

export default SwitchLocalizationDivider