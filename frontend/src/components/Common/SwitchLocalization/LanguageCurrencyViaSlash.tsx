import { Flex, Text } from "@chakra-ui/react"
import BaseSwitchLocalization from "."

const SwitchLocalizationSlash = () => {
  return (
    <BaseSwitchLocalization>
      {({ t, toggleLanguage, currency, toggleCurrency }) => (
        <Flex
          fontSize={["14px", "14px", "14px", "20px"]}
          lineHeight="25px"
          fontWeight={["300", "300", "400", "400"]}
          w="85px"
          textAlign="end"
          display="inline-flex"
        >
          <Text onClick={toggleLanguage}>
            {t("Locale.language")}
          </Text>
          /
          <Text
            onClick={toggleCurrency}
            textTransform="uppercase"
          >
            {currency.code}
          </Text>
        </Flex>
      )}
    </BaseSwitchLocalization>
  )
}

export default SwitchLocalizationSlash