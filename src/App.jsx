import TaskList from './TaskList'
import TaskForm from './TaskForm';
import { useState } from 'react';

export default function App() {
  const initialTasks = []
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

  function handleAddTask(title) {
    const newId = Date.now();
    setTasks([
      ...tasks,
      {id: newId, title: title}
    ])
  }

  return (
    <>
      <TaskForm
        handleAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTasks}
        onDelete={handleDeleteTasks}
      />
    </>
  );
}
