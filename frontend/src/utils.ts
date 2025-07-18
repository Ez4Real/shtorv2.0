import type { ApiError, GiftPublic, ProductPublic, GiftCartItem, ProductCartItem_Output, ProductAttachment } from "./client"
import useCustomToast from "./hooks/useCustomToast"
import { Currency } from "./contexts/CurrencyContext"
import { TranslatablePrice } from "./components/Common/SwitchLocalization"

export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: "Invalid email address",
}

export const namePattern = {
  value: /^[A-Za-z\s\u00C0-\u017F]{1,30}$/,
  message: "Invalid name",
}

export const passwordRules = (isRequired = true) => {
  const rules: any = {
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters",
    },
  }

  if (isRequired) {
    rules.required = "Password is required"
  }

  return rules
}

export const confirmPasswordRules = (
  getValues: () => any,
  isRequired = true,
) => {
  const rules: any = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password
      return value === password ? true : "The passwords do not match"
    },
  }

  if (isRequired) {
    rules.required = "Password confirmation is required"
  }

  return rules
}

export const handleError = (err: ApiError) => {
  const { showErrorToast } = useCustomToast()
  const errDetail = (err.body as any)?.detail
  let errorMessage = errDetail || "Something went wrong."
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    errorMessage = errDetail[0].msg
  }
  showErrorToast(errorMessage)
}

export const setupHorizontalScrollOnOverflow = (container: HTMLElement | null) => {
  if (!container) return

  const isHorizontallyScrollable = container.scrollWidth > container.clientWidth
  if (!isHorizontallyScrollable) return

  const handleWheel = (evt: WheelEvent) => {
    evt.preventDefault()
    container.scrollLeft += evt.deltaY / 3
  }

  container.addEventListener("wheel", handleWheel)

  return () => {
    container.removeEventListener("wheel", handleWheel)
  }
}


export const getItemPrice = (
  item: ProductPublic | GiftPublic | ProductCartItem_Output | GiftCartItem | ProductAttachment,
  currency: Currency,
  quantity?: number
) => {
  const qty = quantity ?? 1
  const priceKey = `price_${currency.code}` as TranslatablePrice
  
  const isProductWithAttachment = (it: any): it is ProductCartItem_Output =>
    typeof it.attachment === "object" && it.attachment !== null

  const attachmentPrice =
    isProductWithAttachment(item) && item.attachment?.[priceKey]
      ? item.attachment[priceKey] * qty
      : 0

  return item[priceKey] * qty + attachmentPrice
};