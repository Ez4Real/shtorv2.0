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
    { size: 'XS', bustCm: '82-85', bustIn: '32-33', waistCm: '63-66', waistIn: '25-26', hipsCm: '87-89', hipsIn: '34-35' },
    { size: 'S', bustCm: '86-89', bustIn: '34-35', waistCm: '67-70', waistIn: '26-27', hipsCm: '90-94', hipsIn: '36-37' },
    { size: 'M', bustCm: '90-93', bustIn: '35-36', waistCm: '71-74', waistIn: '28-29', hipsCm: '95-99', hipsIn: '38-39' },
    { size: 'L', bustCm: '94-97', bustIn: '37-38', waistCm: '75-79', waistIn: '30-31', hipsCm: '100-104', hipsIn: '40-41' },
    { size: 'XL', bustCm: '98-102', bustIn: '39-40', waistCm: '80-86', waistIn: '32-33', hipsCm: '105-111', hipsIn: '42-43' },
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
          { name: t("SizeGuide.title"), path: "/size-guide" }
        ]}
      />
      <Container
        // padding={["0", "0", "0 225px", "0 225px"]}
        whiteSpace="nowrap"
        w="fit-content"
        p={0}
        maxW="100%"
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
          overflowX="auto"
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
            fontSize={["12px", "16px", "18px", "18px"]}
          >
            <Table.Header >
              <Table.Row>
                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                  rowSpan={2}
                >
                  {t("SizeGuide.size")}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                  colSpan={2}
                >
                  {t("SizeGuide.bust")}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                  colSpan={2}
                >
                  {t("SizeGuide.waist")}
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                  colSpan={2}
                >
                  {t("SizeGuide.hips")}
                </Table.ColumnHeader>
              </Table.Row>

              <Table.Row>
                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                >
                  cm
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                >
                  inches
                </Table.ColumnHeader>

                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                >
                  cm
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                >
                  inches
                </Table.ColumnHeader>

                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                >
                  cm
                </Table.ColumnHeader>
                <Table.ColumnHeader
                  textAlign="center"
                  fontWeight="300"
                >
                  inches
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
                    {size.bustCm}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {size.bustIn}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {size.waistCm}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {size.waistIn}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {size.hipsCm}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {size.hipsIn}
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
