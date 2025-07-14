import { Breadcrumb } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

interface breadcrumbItem {
    name: string
    path: string
}

interface BreadcrumbsProps {
  items: breadcrumbItem[]
}


const Breadcrumbs = ({
  items
}: BreadcrumbsProps) => {
  const { t } = useTranslation()
  return (
    <Breadcrumb.Root
      pt={["0", "0", "0", "34px"]}
      pb={["32px", "32px", "32px", "46px"]}
      fontWeight="300"
    >
      <Breadcrumb.List
        flexWrap="wrap"
        gap="4px"
      >
        <Breadcrumb.Item>
          <Breadcrumb.Link
            href="/#root"
            fontSize="16px"
            color="black"
          >
            {t("Breadcrumb.homepage")}
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        {items?.map((item, index) => (
          <Breadcrumb.Item key={index}>
            <Breadcrumb.Link
              href={item.path}
              fontSize="16px"
              color="black"
            >/{item.name}
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}

export default Breadcrumbs