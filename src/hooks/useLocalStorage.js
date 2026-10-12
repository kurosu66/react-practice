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
  return [state, dispatch];
}
