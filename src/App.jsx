import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { useContext, useReducer } from 'react';
import { ThemeContext, ThemeProvider } from './ThemeContext';

function TasksReducer(state, action) {
  switch (action.type) {
    case 'added':
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
    case 'deleted':
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

function AppContent() {
  const { isDark, setIsDark } = useContext(ThemeContext);

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
        type: 'deleted',
        id: taskId,
      })
  };

  function handleAddTask(title) {
    dispatch({
      type: 'added',
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
      <div style={{
        background: isDark ? '#333' : '#fff',
        color: isDark ? '#fff' : '#333',
        minHeight: '100vh',
        margin: -8,
        padding: 8,
        boxSizing: 'border-box',
      }}>
      <TaskForm
        handleAddTask={handleAddTask}
      />
      <button onClick={() => setIsDark(!isDark)}>
        {isDark ? 'ライトモードにする' : 'ダークモードにする'}
      </button>
        <button onClick={handleUndoTask} disabled={state.history.length === 0}>
          元に戻す
        </button>
      <TaskList
        tasks={state.tasks}
        onToggle={handleToggleTasks}
        onDelete={handleDeleteTasks}
        />
      </div>
    </>
  );
}

export default function App() {
  return (
    <>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </>
  );
}
