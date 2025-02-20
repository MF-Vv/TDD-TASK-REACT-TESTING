import { render, screen } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import ItemCard from "@/components/ItemCard"
import { Item } from "@/utils/utils"

type MockProps = Item & {
  onDelete: (id: string) => void
}

describe("ItemCard Component", () => {
  const mockProps: MockProps = {
    id: "1",
    title: "Test title",
    description: "Test description",
    category: "important",
    onDelete: vi.fn(),
  }

  test("Render card with correct content", () => {
    render(<ItemCard {...mockProps} />)
    expect(
      screen.getByRole("heading", { name: /test title/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/test description/i)).toBeInTheDocument()
    expect(screen.getByText(/important/i)).toBeInTheDocument()
  })

  test("Calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup()
    render(<ItemCard {...mockProps} />)

    const deleteButton = screen.getByRole("button", { name: "Delete task: 1" })
    await user.click(deleteButton)

    expect(mockProps.onDelete).toHaveBeenCalledWith("1")
  })
})
