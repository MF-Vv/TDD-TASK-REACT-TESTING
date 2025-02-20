import { type ItemWithoutID, type ItemCategory } from "@/utils/utils"
import { useState } from "react"

type FormProps = {
  onSubmit: (newItem: ItemWithoutID) => void
}

export default function Form({ onSubmit }: FormProps) {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [category, setCategory] = useState<ItemCategory | "">("")

  const labelStyle = "text-sm font-medium leading-none block mb-2"
  const inputStyle = "flex h-10 w-full border rounded-md px-3 py-2 text-sm"

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !desc || !category) return

    onSubmit({ title, description: desc, category })
    setTitle("")
    setDesc("")
    setCategory("")
  }

  return (
    <div className="max-w-xl">
      <h2 className="text-xl font-semibold mb-2 capitalize">Add new task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className={labelStyle}>
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="description" className={labelStyle}>
            Description
          </label>
          <input
            id="description"
            required
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="category" className={labelStyle}>
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as ItemCategory)}
            className={inputStyle}
            required
          >
            <option value="" disabled>
              Select a category
            </option>

            <option value="urgent">Urgent</option>
            <option value="important">Important</option>
            <option value="normal">Normal</option>
            <option value="low">Low priority</option>
          </select>
        </div>
        <button
          type="submit"
          className="capitalize rounded text-sm font-medium bg-blue-500 text-white px-4 py-2 h-10"
        >
          Add task
        </button>
      </form>
    </div>
  )
}
