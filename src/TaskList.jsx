export default function TasksList({tasks}) {
  const taskList = tasks.map(task =>
    <li key={task.id}>{task.completed ? task.title + '  ✅' : task.title }</li>
  );
  return (
    <ul>{taskList}</ul>
  )
}
