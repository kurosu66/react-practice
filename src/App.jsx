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

  function handleToggleTasks(taskId, nextCompleted) {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: nextCompleted };
      } else {
        return task;
      }
    }))
  }

  function handleDeleteTasks(taskId) {
    setTasks(tasks.filter(t =>
      t.id !== taskId
    ))
  };

  return (
    <>
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTasks}
        onDelete={handleDeleteTasks}
      />
    </>
  );
}
