import { Item } from "@/utils/utils"
import { Trash2 } from "lucide-react"

type ItemCardProps = Item & {
  onDelete: (id: string) => void
}

const categoryColors = {
  urgent: "bg-red-500",
  important: "bg-yellow-500",
  low: "bg-green-500",
  normal: "bg-blue-500",
}

export default function ItemCard({
  id,
  title,
  description,
  category,
  onDelete,
}: ItemCardProps) {
  return (
    <article className="w-full rounded-lg border shadow-s">
      <div className="flex flex-row items-center justify-between p-6 pb-2">
        <h3 className="text-lg font-semibold leading-none tracking-tight">
          {title}
        </h3>
        <button
          onClick={() => onDelete(id)}
          aria-label={`Delete task: ${id}`}
          className="inline-flex h-9 w-9 items-center justify-center"
        >
          <Trash2 className="h-4- w-4" />
        </button>
      </div>
      <div className="p-6 pt-2">
        <p className="text-sm mb-2">{description}</p>
        <p
          className={`inline-block ${
            categoryColors[category as keyof typeof categoryColors] ||
            "bg-gray-500"
          } text-white text-xs px-2 py-1 rounded-full`}
        >
          {category}
        </p>
      </div>
    </article>
  )
}
