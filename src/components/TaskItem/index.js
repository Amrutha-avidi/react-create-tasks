import './index.css'

const TaskItem = props => {
  const {taskDetails} = props
  const {taskInput, tagInput} = taskDetails

  return (
    <li className="task">
      <p className="task-item">{taskInput}</p>
      <p className="tag-item">{tagInput}</p>
    </li>
  )
}
export default TaskItem
