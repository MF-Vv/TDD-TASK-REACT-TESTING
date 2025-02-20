import { type Item } from "@/utils/utils"
import ItemCard from "./ItemCard"

type ListProps = {
  items: Item[]
  onDelete: (id: string) => void
}

export default function List({ items, onDelete }: ListProps) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold mb-2">Task Flow Board</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {items.map((item) => {
          return <ItemCard key={item.id} {...item} onDelete={onDelete} />
        })}
      </div>
    </section>
  )
}
