import { Breadcrumb } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"

interface breadcrumbItem {
    name: string
    path: string
}

interface BreadCrumbsProps {
  items: breadcrumbItem[]
}


const BreadCrumbs = ({
    items
}: BreadCrumbsProps) => {
  const { t } = useTranslation()

  return (
    <Breadcrumb.Root
      pb="32px"
    >
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link
            href="/#root"
            fontSize="16px"
          >Home
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        {items?.map((item) => (
          <Breadcrumb.Item>
            <Breadcrumb.Link
              href={item.path}
              fontWeight="500"
              fontSize="16px"
            >/{item.name}
            </Breadcrumb.Link>
          </Breadcrumb.Item>
        ))}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}

export default BreadCrumbs