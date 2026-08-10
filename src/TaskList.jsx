export default function TasksList({tasks, onToggle, onDelete}) {
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
        {task.title}
      </label>
        <button onClick={() => {
          onDelete(task.id);
        }}>削除</button>
    </li>
  );

  return (
    <ul>{taskList}</ul>
  )
}
