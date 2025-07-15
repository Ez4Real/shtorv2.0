import { createContext, useContext, useState, ReactNode } from 'react'
import {
  OrderBasketItem_Output,
  OpenAPI,
  ProductPublic,
  GiftCartItem,
  ProductCartItem_Input,
  GiftPublic,
  OrderBasketItem_Input
} from '@/client'
import { Currency } from './CurrencyContext'
import { TranslatablePrice } from '@/components/Common/SwitchLocalization'

interface CartContextType {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  items: OrderBasketItem_Output[]
  addItem: (input: ProductCartItem_Input | GiftCartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: (currency: Currency) => number
}

const CartContext = createContext<CartContextType | null>(null)

export const pickProductData = (product: ProductPublic) => ({
  id: product.id,
  title_en: product.title_en,
  title_uk: product.title_uk,
  description_en: product.description_en,
  description_uk: product.description_uk,
  category: product.category,
  collection: product.collection,
  created_at: product.created_at,
  price_uah: product.price_uah,
  price_usd: product.price_usd,
  price_eur: product.price_eur,
  images: product.images,
})

export function pickGiftData(
  gift: GiftPublic,
  customPrice: number | null = null,
  currencyCode: "uah" | "usd" | "eur" = "usd"
) {
  const RATE = 33.33333333333333

  const isCustom = gift.dynamic_price && customPrice

  const price_uah = isCustom
    ? currencyCode === "uah"
      ? Math.round(customPrice!)
      : Math.round(customPrice! * RATE)
    : gift.price_uah;

  const price_usd = isCustom
    ? currencyCode === "uah"
      ? Math.round(customPrice! / RATE)
      : Math.round(customPrice!)
    : gift.price_usd;

  const price_eur = price_usd

  const data = {
    id: gift.id,
    title_en: gift.title_en,
    title_uk: gift.title_uk,
    description_en: gift.description_en,
    description_uk: gift.description_uk,
    price_uah,
    price_usd,
    price_eur,
    created_at: gift.created_at,
    images: [gift.image],
  }

  return data
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<OrderBasketItem_Output[]>([])


  const getCartTotal = (currency: Currency) => {
    const key = `price_${currency.code}` as TranslatablePrice
    return items.reduce((sum, item) => {
      const base = item.data[key] ?? 0
      const extra =
        item.data.type === "product" && item.data.attachment
          ? item.data.attachment[key] ?? 0
          : 0
      return sum + (base + extra) * (item.qty ?? 1)
    }, 0)
  }

  const addItem = (
    input: ProductCartItem_Input | GiftCartItem,
    quantity: number = 1
  ) => {
    const newItem: OrderBasketItem_Input = {
      data: input,
      icon: `${OpenAPI.BASE}/media/${input.images[0].url}`,
      code: "123",
      id: crypto.randomUUID(),
      qty: quantity
    }
    setItems(prev => {
      const match = prev.find(item => isSameItem(item, newItem))
      if (match) {
        return prev.map(item =>
          isSameItem(item, newItem)
            ? { ...item, qty: (item.qty ?? 1) + (newItem.qty ?? 1) }
            : item
        )
      }
      return [...prev, newItem]
    })
    setIsOpen(true)
  }

  const isSameItem = (a: OrderBasketItem_Output, b: OrderBasketItem_Output) => {
    if (a.data.type !== b.data.type || a.data.id !== b.data.id) return false
    if (a.data.type === 'gift' && b.data.type === 'gift') {
      return (
        a.data.price_usd === b.data.price_usd &&
        a.data.certificate_type === b.data.certificate_type
      )
    }
    if (a.data.type === 'product' && b.data.type === 'product') {
      return (
        a.data.size === b.data.size &&
        a.data.attachment?.name === b.data.attachment?.name
      )
    }
    return true
  }

  const removeItem = (id: string) =>
    setItems(prev => prev.filter(item => item.id !== id))

  const updateQuantity = (id: string, quantity: number) =>
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, qty: quantity } : item))
    )

  const clearCart = () => setItems([])

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setIsOpen,
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}