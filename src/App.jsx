import TaskList from './TaskList'
import TaskForm from './TaskForm';
import { useReducer } from 'react';

export default function App() {
  const initialState = {
    tasks: [],
    history: [],
  }
  const [state, dispatch] = useReducer(TasksReducer, initialState);

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

  function handleUndoTask() {
    dispatch({
      type: 'undo',
    })
  };

  return (
    <>
      <TaskForm
        handleAddTask={handleAddTask}
      />
      <button onClick={handleUndoTask}> 元に戻す </button>
      <TaskList
        tasks={state.tasks}
        onToggle={handleToggleTasks}
        onDelete={handleDeleteTasks}
      />
    </>
  );

  function TasksReducer(state, action) {
    switch (action.type) {
      case 'add':
        return {
          history: [...state.history, state.tasks],
          tasks: [
            ...state.tasks,
            { id: Date.now(), title: action.title, },
          ],
        };
      case 'toggled':
        return {
          history: [...state.history, state.tasks],
          tasks: state.tasks.map((task) =>
            task.id === action.id
              ? { ...task, completed: action.completed }
              : task
          ),
        };
      case 'delete':
        return {
          history: [...state.history, state.tasks],
          tasks: state.tasks.filter(task => task.id !== action.id),
        }

      case 'undo':
        if (state.history.length === 0) return state;
        return {
          history: state.history.slice(0, -1),
          tasks: state.history[state.history.length - 1]
        };
      default:
        return state;
    }
  }
}
