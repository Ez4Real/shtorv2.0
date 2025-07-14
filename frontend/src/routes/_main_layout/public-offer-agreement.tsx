import { CustomList } from "@/components/ui/custom-list"
import { Container, Text, VStack } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"


export const Route = createFileRoute("/_main_layout/public-offer-agreement")({
  component: PublicOfferAgreement,
})


function PublicOfferAgreement() {
  const { t } = useTranslation()


  return (
    <Container
      p={0}
      maxW="100vw"
      mb={["85px", "85px", "50px", "50px"]}
      padding={["0 16px", "0 16px", "0 16px", "0 46px"]}
    >
      <VStack
        gap={0}
        fontWeight="300"
      >
        <Text
          fontSize={["16px", "16px", "16px", "24px"]}
          lineHeight="30px"
          textTransform="uppercase"
        >
          {t("PublicOfferAgreement.title")}
        </Text>

        <VStack
          mt={["24px", "24px", "36px", "36px"]}
          alignItems="flex-start"
          lineHeight="22px"
          fontSize={["16px", "16px", "18px", "18px"]}
          gapY={"24px"}
        >
          <CustomList
            number={1}
            title={t("PublicOfferAgreement.termsAndDefinitions.title")}
            listElements={[
                {number: '1.1.', content: t("PublicOfferAgreement.termsAndDefinitions.1")},
                {number: '1.2.', content: t("PublicOfferAgreement.termsAndDefinitions.2")},
                {number: '1.3.', content: t("PublicOfferAgreement.termsAndDefinitions.3")},
                {number: '1.4.', content: t("PublicOfferAgreement.termsAndDefinitions.4")}
            ]}
          />
          <CustomList
            number={2}
            title={t("PublicOfferAgreement.generalProvisions.title")}
            listElements={[
                {number: '2.1.', content: t("PublicOfferAgreement.generalProvisions.1")},
                {number: '2.2.', content: t("PublicOfferAgreement.generalProvisions.2")},
                {number: '3.3.', content: t("PublicOfferAgreement.generalProvisions.3")}
            ]}
          />
          <CustomList
            number={3}
            title={t("PublicOfferAgreement.contractSubject.title")}
            listElements={[
                {number: '3.1.', content: t("PublicOfferAgreement.contractSubject.1")},
                {number: '3.2.', content: t("PublicOfferAgreement.contractSubject.2")}
            ]}
          />
          <CustomList
            number={4}
            title={t("PublicOfferAgreement.placingAnOrder.title")}
            listElements={[
              {number: '4.1.', content: t("PublicOfferAgreement.placingAnOrder.1")},
              {number: '4.2.', content: t("PublicOfferAgreement.placingAnOrder.2")},
              {number: '4.3.', content: t("PublicOfferAgreement.placingAnOrder.3")},
              {number: '4.4.', content: t("PublicOfferAgreement.placingAnOrder.4")},
              {number: '4.5.', content: t("PublicOfferAgreement.placingAnOrder.5")},
              {number: '4.6.', content: t("PublicOfferAgreement.placingAnOrder.6")},
              {number: '4.7.', content: t("PublicOfferAgreement.placingAnOrder.7")},
              {number: '4.8.', content: t("PublicOfferAgreement.placingAnOrder.8")}
            ]}
          />
          <CustomList
            number={5}
            title={t("PublicOfferAgreement.goodsPriceAndDelivery.title")}
            listElements={[
              {number: '5.1.', content: t("PublicOfferAgreement.goodsPriceAndDelivery.1")},
              {number: '5.2.', content: t("PublicOfferAgreement.goodsPriceAndDelivery.2")},
              {number: '5.3.', content: t("PublicOfferAgreement.goodsPriceAndDelivery.3")},
              {number: '5.4.', content: t("PublicOfferAgreement.goodsPriceAndDelivery.4")},
              {number: '5.5.', content: t("PublicOfferAgreement.goodsPriceAndDelivery.5")},
              {number: '5.6.', content: t("PublicOfferAgreement.goodsPriceAndDelivery.6")},
              {number: '5.7.', content: t("PublicOfferAgreement.goodsPriceAndDelivery.7")},
              {number: '5.8.', content: t("PublicOfferAgreement.goodsPriceAndDelivery.8")}
            ]}
          />
          <CustomList
            number={6}
            title={t("PublicOfferAgreement.partiesRightsAndObligations.title")}
            listElements={[
              {number: '6.1.', content: t("PublicOfferAgreement.partiesRightsAndObligations.1")},
              {number: '6.1.1.', content: t("PublicOfferAgreement.partiesRightsAndObligations.1.1")},
              {number: '6.1.2.', content: t("PublicOfferAgreement.partiesRightsAndObligations.1.2")},
              {number: '6.2.', content: t("PublicOfferAgreement.partiesRightsAndObligations.2")},
              {number: '6.2.1.', content: t("PublicOfferAgreement.partiesRightsAndObligations.2.1")},
              {number: '6.3.', content: t("PublicOfferAgreement.partiesRightsAndObligations.3")},
              {number: '6.3.1.', content: t("PublicOfferAgreement.partiesRightsAndObligations.3.1")},
              {number: '6.3.2.', content: t("PublicOfferAgreement.partiesRightsAndObligations.3.2")}
            ]}
          />
          <CustomList
            number={7}
            title={t("PublicOfferAgreement.termsOfReturn.title")}
            listElements={[
              {number: '7.1.', content: t("PublicOfferAgreement.termsOfReturn.1")},
              {number: '7.2.', content: t("PublicOfferAgreement.termsOfReturn.2")},
              {number: '7.3.', content: t("PublicOfferAgreement.termsOfReturn.3")},
              {number: '7.4.', content: t("PublicOfferAgreement.termsOfReturn.4")},
              {number: '7.5.', content: t("PublicOfferAgreement.termsOfReturn.5")},
              {number: '7.6.', content: t("PublicOfferAgreement.termsOfReturn.6")}
            ]}
          />
          <CustomList
            number={8}
            title={t("PublicOfferAgreement.partiesLiability.title")}
            listElements={[
              {number: '8.1.', content: t("PublicOfferAgreement.partiesLiability.1")},
              {number: '8.2.', content: t("PublicOfferAgreement.partiesLiability.2")},
            ]}
          />
          <CustomList
            number={9}
            title={t("PublicOfferAgreement.confidentiality.title")}
            listElements={[
              {number: '9.1.', content: t("PublicOfferAgreement.confidentiality.1")},
              {number: '9.2.', content: t("PublicOfferAgreement.confidentiality.2")},
              {number: '9.3.', content: t("PublicOfferAgreement.confidentiality.3")},
            ]}
          />
          <CustomList
            number={10}
            title={t("PublicOfferAgreement.other.title")}
            listElements={[
              {number: '10.1.', content: t("PublicOfferAgreement.other.1")},
              {number: '10.2.', content: t("PublicOfferAgreement.other.2")},
            ]}
          />

        </VStack>
      </VStack>
    </Container>
  )
}
