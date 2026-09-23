import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

export default function TasksList({ tasks, onToggle, onDelete }) {
  const { isDark } = useContext(ThemeContext);

  const taskList = tasks.map(task =>
    <li key={task.id}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={e => {
            onToggle(
              task.id,
              e.target.checked
            );
          }}
        />
        {task.completed ? (
          <del>
            { task.title }
          </del>
        ) : (
          task.title
        )}
      </label>
        <button onClick={() => {
          onDelete(task.id);
        }}>削除</button>
    </li>
  );

  return (
    <ul style={{ background: isDark ? '#333': '#fff' }}>{taskList}</ul>
  )
}
