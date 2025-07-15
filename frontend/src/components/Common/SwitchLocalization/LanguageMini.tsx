import { Box } from "@chakra-ui/react"
import BaseSwitchLocalization from "."

const SwitchLocalizationMini = () => {
  return (
    <BaseSwitchLocalization>
      {({ t, toggleLanguage }) => (
        <Box
          cursor="pointer"
          fontSize="20px"
          fontWeight="300"
          lineHeight="25px"
          display={["none", "none", "block", "block"]}
          onClick={toggleLanguage}
          textAlign="center"
        >
          {t("Locale.language")}
        </Box>
      )}
    </BaseSwitchLocalization>
  )
}

export default SwitchLocalizationMini