import Form from "./components/Form"
import List from "./components/List"
import { useFlowContext } from "./context/FlowContext"
// import { useFlowManager } from "./utils/utils"

function App() {
  const { items, handleAddItem, handleDeleteItem } = useFlowContext()

  return (
    <main className="container mx-auto p-4 max-w-xl">
      <h1 className="text-3xl font-bold mb-8">Task Focus Flow</h1>
      <Form onSubmit={handleAddItem} />
      <List items={items} onDelete={handleDeleteItem} />
    </main>
  )
}
export default App
