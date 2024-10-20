import { TaskList } from "./components/TaskList";
import { AddTask } from "./components/AddTask";
import { Container } from "reactstrap";


function App() {

  return (
    <Container>
      <AddTask />
      <TaskList />
    </Container>
  )
}

export default App
