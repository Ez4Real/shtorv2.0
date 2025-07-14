import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type CurrencyCode = "usd" | "uah" | "eur"

export type Currency = {
  code: CurrencyCode
  symbol: "$" | "₴" | "€"
}

interface CurrencyContextType {
  currency: Currency
  setCurrency: (currency: Currency) => void
  toggleCurrency: () => void
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

const CURRENCY_KEY = "selected_currency"

const ccyCodes: Record<string, number> = {
  uah: 980,
  usd: 840,
  eur: 978,
}

export function getCurrencyCode(ccy: string): number {
  return ccyCodes[ccy] ?? 840
}

  

export const currencyList: Record<CurrencyCode, Currency> = {
  usd: { code: "usd", symbol: "$" },
  eur: { code: "eur", symbol: "€" },
  uah: { code: "uah", symbol: "₴" },
}

const currencyCodes = Object.keys(currencyList) as CurrencyCode[]

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>(currencyList.usd)

  useEffect(() => {
    const storedCode = localStorage.getItem(CURRENCY_KEY) as CurrencyCode | null
    if (storedCode && storedCode in currencyList) {
      setCurrencyState(currencyList[storedCode])
    }
  }, [])

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency)
    localStorage.setItem(CURRENCY_KEY, newCurrency.code)
  }

  const toggleCurrency = () => {
    const currentIndex = currencyCodes.indexOf(currency.code)
    const nextIndex = (currentIndex + 1) % currencyCodes.length
    setCurrency(currencyList[currencyCodes[nextIndex]])
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider")
  }
  return context
}