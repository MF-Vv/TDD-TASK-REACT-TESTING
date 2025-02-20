import { render, screen } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import userEvent, { type UserEvent } from "@testing-library/user-event"
import Form from "@/components/Form"

const getFormElements = () => {
  return {
    titleInput: screen.getByRole("textbox", { name: /title/i }),
    descriptionInput: screen.getByRole("textbox", { name: /description/i }),
    categorySelect: screen.getByRole("combobox", { name: /category/i }),
    submitButton: screen.getByRole("button", { name: /add task/i }),
  }
}

describe("Form Component", () => {
  let user: UserEvent
  const mockOnSubmit = vi.fn()

  beforeEach(() => {
    mockOnSubmit.mockClear()
    user = userEvent.setup()
  })

  test("Should render the form", () => {
    render(<Form onSubmit={mockOnSubmit} />)
    expect(screen.getByText("Add new task")).toBeInTheDocument()
  })

  test("Should render form with every fields initially", () => {
    render(<Form onSubmit={mockOnSubmit} />)
    const { titleInput, descriptionInput, categorySelect } = getFormElements()

    expect(titleInput).toHaveValue("")
    expect(descriptionInput).toHaveValue("")
    expect(categorySelect).toHaveValue("")
  })

  test("Submit form with entered values", async () => {
    render(<Form onSubmit={mockOnSubmit} />)
    const { titleInput, descriptionInput, categorySelect, submitButton } =
      getFormElements()
    await user.type(titleInput, "Task 1")
    await user.type(descriptionInput, "Description 1")
    await user.selectOptions(categorySelect, "urgent")

    await user.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: "Task 1",
      description: "Description 1",
      category: "urgent",
    })
  })

  test("Validates required fields", async () => {
    render(<Form onSubmit={mockOnSubmit} />)
    const { submitButton } = getFormElements()

    await user.click(submitButton)
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  test("Clear form after successful submission", async () => {
    render(<Form onSubmit={mockOnSubmit} />)
    const { titleInput, descriptionInput, categorySelect, submitButton } =
      getFormElements()
    await user.type(titleInput, "Task 1")
    await user.type(descriptionInput, "Description 1")
    await user.selectOptions(categorySelect, "urgent")
    await user.click(submitButton)

    expect(titleInput).toHaveValue("")
    expect(descriptionInput).toHaveValue("")
    expect(categorySelect).toHaveValue("")
  })
})
