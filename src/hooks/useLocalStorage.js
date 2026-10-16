import { useReducer, useEffect } from 'react';

export function useLocalStorage(reducer, initialState) {
  const [state, dispatch] = useReducer(reducer, initialState, (defaultTasks) => {
    const saved = localStorage.getItem('tasks');
    return {
      tasks: saved ? JSON.parse(saved) : defaultTasks.tasks,
      history: [],
    }
  });
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks))
  }, [state.tasks])

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === 'tasks' && event.newValue) {
        dispatch({ type: 'synced', tasks: JSON.parse(event.newValue) })
      }
    }
      window.addEventListener('storage', handleStorage);
      return () => { window.removeEventListener('storage', handleStorage) };
    }, []);
  return [state, dispatch];
}
