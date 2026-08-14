import { useState } from 'react';

export default function TaskForm({ handleAddTask }) {
  const [title, setTitle] = useState('');

  return (
  <>
      <h1>タスク追加</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    <button onClick={() => handleAddTask(title)}>Add</button>
  </>
  )
}
