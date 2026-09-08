import TaskList from './TaskList'
import TaskForm from './TaskForm';
import { useReducer } from 'react';

export default function App() {
  const [tasks, dispatch] = useReducer(TasksReducer, []);

  function handleToggleTasks(taskId, nextCompleted) {
    dispatch({
      type: 'toggled',
      id: taskId,
      completed: nextCompleted,
    })
  };

  function handleDeleteTasks(taskId) {
      dispatch({
        type: 'delete',
        id: taskId,
      })
  };

  function handleAddTask(title) {
    dispatch({
      type: 'add',
      title: title,
    })
  };

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

  function TasksReducer(tasks, action) {
    switch (action.type) {
      case 'add':
      return [
        ...tasks,
        { id: Date.now(), title: action.title, },
      ];
      case 'toggled':
        return tasks.map((task) =>
            task.id === action.id
              ? { ...task, completed: action.completed }
              : task
        );
      case 'delete':
        return tasks.filter(task => task.id !== action.id);
      default:
        return tasks;
    }
  }
}
