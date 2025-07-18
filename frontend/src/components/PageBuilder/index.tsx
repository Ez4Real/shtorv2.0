import { useEffect, useState } from "react"
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react"
import NotFound from "../Common/NotFound"
import { useTranslation } from "react-i18next"


builder.init(import.meta.env.VITE_BUILDER_API_KEY)

export default function Builder() {
  const { i18n } = useTranslation()
  const isPreviewingInBuilder = useIsPreviewing()
  const [notFound, setNotFound] = useState(false)
  const [content, setContent] = useState()

  useEffect(() => {
    async function fetchContent() {
      const content = await builder
        .get("page", {
          url: window.location.pathname,
          query: {
            data: {
              locale: i18n.language
            }
          }
        })
        .promise()

      setContent(content)
      setNotFound(!content)

      // if (content?.data.title) {
      //  document.title = content.data.title
      // }
    }
    fetchContent()
  }, [window.location.pathname, i18n.language])
  
  if (notFound && !isPreviewingInBuilder) {
    return <NotFound />
  }

  return (
    <BuilderComponent model="page" content={content}/>
  )
}