import { Flex, Text } from "@chakra-ui/react"
import BaseSwitchLocalization from "."

const SwitchLocalizationSlash = () => {
  return (
    <BaseSwitchLocalization>
      {({ t, toggleLanguage, currency, toggleCurrency }) => (
        <Flex
          fontSize={["14px", "14px", "14px", "20px"]}
          lineHeight={["18px", "18px", "25px", "25px"]}
          fontWeight={["300", "300", "400", "400"]}
          w="85px"
          textAlign="end"
          display="inline-flex"
          justifyContent="flex-end"
        >
          <Text
            onClick={toggleLanguage}
            cursor="pointer"
          >
            {t("Locale.language")}
          </Text>
          /
          <Text
            cursor="pointer"
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