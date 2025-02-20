import { render, screen } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import userEvent, { type UserEvent } from "@testing-library/user-event"
import { FlowProvider } from "@/context/FlowContext"
import App from "../App"

const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /category/i }),
    submitButton: screen.getByRole("button", { name: /add task/i }),
  }
}

// Render the App component with the FlowProvider
const renderAppContent = () => {
  return render(
    <FlowProvider>
      <App />
    </FlowProvider>
  )
}

const addTestItem = async (user: UserEvent) => {
  const { titleInput, descriptionInput, categorySelect, submitButton } =
    getFormElements()

  await user.type(titleInput, "Test Title")
  await user.type(descriptionInput, "Test Description")
  await user.selectOptions(categorySelect, "urgent")
  await user.click(submitButton)
}

describe("App Component Context", () => {
  let user: UserEvent

  beforeEach(() => {
    vi.clearAllMocks()
    user = userEvent.setup()
    renderAppContent()
  })

  test("Render heading and form elements", () => {
    expect(
      screen.getByRole("heading", { name: "Task Focus Flow", level: 1 })
    ).toBeInTheDocument()

    const elements = getFormElements()
    Object.values(elements).forEach((element) => {
      expect(element).toBeInTheDocument()
    })
  })

  test("Ensures an item is added and displayed in the ItemCard with the correct value.", async () => {
    const cardsBefore = screen.queryAllByRole("article")
    expect(cardsBefore).toHaveLength(0)

    await addTestItem(user)

    const cardsAfter = screen.queryAllByRole("article")
    expect(cardsAfter).toHaveLength(1)

    expect(screen.getByText("Test Title")).toBeInTheDocument()
    expect(screen.getByText("Test Description")).toBeInTheDocument()
    expect(screen.getByText("Urgent")).toBeInTheDocument()
  })

  test("Handles deleting an item", async () => {
    await addTestItem(user)

    const deleteButton = screen.getByRole("button", { name: /delete/i })
    expect(deleteButton).toBeInTheDocument()

    await user.click(deleteButton)
    expect(screen.queryAllByRole("article")).toHaveLength(0)
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument()
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument()
  })
})
