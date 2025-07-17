import Breadcrumbs from "@/components/Common/Breadcrumbs"
import { Container, Table, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"


export const Route = createFileRoute("/_main_layout/size-guide")({
  component: SizeGuide,
})


function SizeGuide() {
  const { t } = useTranslation()

  const sizes = [
    { size: 'XS', bust: '82-85', waist: '63-66', hips: '87-89' },
    { size: 'S', bust: '86-89', waist: '67-70', hips: '90-94' },
    { size: 'M', bust: '90-93', waist: '71-74', hips: '95-99' },
    { size: 'L', bust: '94-97', waist: '75-79', hips: '100-104' },
    { size: 'XL', bust: '98-102', waist: '80-86', hips: '105-111' },
  ];


  return (
    <Container
      p={0}
      maxW="100vw"
      mb={["250px", "250px", "140px", "140px"]}
      px={["16px", "16px", "46px", "46px"]}
    >
      <Breadcrumbs
        items={[
            {name: t("SizeGuide.title"), path: "/size-guide"}
        ]}
      />
      <Container
        padding={["0", "0", "0 225px", "0 225px"]}
      >
        <Text
            fontSize={["16px", "16px", "16px", "24px"]}
            lineHeight="30px"
            textTransform="uppercase"
            fontWeight="300"
            textAlign="center"
        >
            {t("SizeGuide.title")}
        </Text>
        <Container
            mt={["24px", "24px", "64px", "64px"]}
            p={["0px", "0px", "23px 28px", "23px 28px"]}
            border=".5px solid black"
        >
            <Table.Root
            size="md"
            showColumnBorder
            css={{
              '& th, & td': {
              borderColor: 'black'
              },
              '& tbody > tr:last-of-type td': {
              borderBottom: 'none',
              },
            }}
            fontWeight="300"
            fontSize={["14px", "14px", "18px", "18px"]}
            >
            <Table.Header >
                <Table.Row>
                <Table.ColumnHeader
                    textAlign="center"
                    fontWeight="300"
                >
                    {t("SizeGuide.size")}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                    textAlign="center"
                    fontWeight="300"
                >
                    {t("SizeGuide.bust")}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                    textAlign="center"
                    fontWeight="300"
                >
                    {t("SizeGuide.waist")}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                    textAlign="center"
                    fontWeight="300"
                >
                    {t("SizeGuide.hips")}
                </Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body >
              {sizes.map((size, index) => (
                <Table.Row key={index}>
                  <Table.Cell textAlign="center">
                  {size.size}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                  {size.bust}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                  {size.waist}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                  {size.hips}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Container>
      </Container>
    </Container>
  )
}
