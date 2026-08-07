export default function TasksList({tasks, onToggle}) {
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
    </li>
  );

  return (
    <ul>{taskList}</ul>
  )
}
