import TaskList from './TaskList'
import { useState } from 'react';

export default function App() {
  const initialTasks = [
    { id: 1, title: '日本円を買う', completed: false },
    { id: 2, title: '宿題', completed: false },
    { id: 3, title: '掃除', completed: true },
    { id: 4, title: '買い出し', completed: false }
  ]

  const [tasks, setTasks] = useState(initialTasks);

  return (
    <>
      <TaskList tasks={tasks} />
    </>
  );
}
