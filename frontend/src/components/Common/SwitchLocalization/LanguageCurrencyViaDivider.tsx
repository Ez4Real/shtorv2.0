import { Box } from "@chakra-ui/react"
import BaseSwitchLocalization from "."

const SwitchLocalizationDivider = () => {
  return (
    <BaseSwitchLocalization>
      {({ t, toggleLanguage, currency, toggleCurrency }) => (
        <Box
          fontSize="14px"
          fontWeight="300"
          cursor="pointer"
          textAlign="center"
          w="35px"
        >
          <Box
            onClick={toggleLanguage}
            borderBottom="1px solid"
          >
            {t("Locale.language")}
          </Box>
          <Box
            className="currency"
            onClick={toggleCurrency}
            textTransform="uppercase"
          >{currency.code}</Box>
        </Box>
      )}
    </BaseSwitchLocalization>
  )
}

export default SwitchLocalizationDivider