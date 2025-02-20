import React, { createContext, useContext, useState } from "react"
import { type Item, type ItemWithoutID } from "@/utils/utils"

type FlowContextType = {
  items: Item[]
  handleAddItem: (newItem: ItemWithoutID) => void
  handleDeleteItem: (id: string) => void
}

const FlowContext = createContext<FlowContextType | undefined>(undefined)

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([])

  const handleAddItem = (newItem: ItemWithoutID) => {
    setItems((prevItems) => [
      ...prevItems,
      { ...newItem, id: Date.now().toString() },
    ])
  }

  const handleDeleteItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  return (
    <FlowContext.Provider value={{ items, handleAddItem, handleDeleteItem }}>
      {children}
    </FlowContext.Provider>
  )
}

export function useFlowContext() {
  const context = useContext(FlowContext)
  if (context === undefined) {
    throw new Error("useFlow must be used within a FlowProvider")
  }
  return context
}
