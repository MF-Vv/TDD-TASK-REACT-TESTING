import { render, screen } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import List from "@/components/List"
import { Item } from "@/utils/utils"

vi.mock("../components/ItemCard", () => {
  return {
    default: () => <article>item card</article>,
  }
})

describe("List Component", () => {
  const mockItems: Item[] = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      category: "urgent",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      category: "low",
    },
  ]
  const mockOnDelete = vi.fn()

  test("Render the flow board heading", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />)
    expect(
      screen.getByRole("heading", { name: /flow board/i, level: 2 })
    ).toBeInTheDocument()
  })

  test("Render the empty grid when items not provided", () => {
    render(<List items={[]} onDelete={mockOnDelete} />)
    const cards = screen.queryAllByRole("article")
    expect(cards).toHaveLength(0)
  })

  test("Alternatives - Render the empty grid when items not provided", () => {
    const { queryAllByRole } = render(
      <List items={[]} onDelete={mockOnDelete} />
    )
    expect(queryAllByRole("article")).toHaveLength(0)
  })

  test("Render the correct number of ItemCards", () => {
    render(<List items={mockItems} onDelete={mockOnDelete} />)
    const cards = screen.getAllByRole("article")
    expect(cards).toHaveLength(mockItems.length)
  })

  test("Alternatives - Render the correct number of ItemCards", () => {
    const { getAllByRole } = render(
      <List items={mockItems} onDelete={mockOnDelete} />
    )
    const cards = getAllByRole("article")
    expect(cards).toHaveLength(mockItems.length)
  })
})
