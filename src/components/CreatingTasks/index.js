import {Component} from 'react'
import {v4 as uudiv4} from 'uuid'
import TagItem from '../TagItem'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class CreatingTasks extends Component {
  state = {
    taskInput: '',
    tagInput: tagsList[0].optionId,
    taskList: [],
    activeTag: 'INITIAL',
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTag = event => {
    this.setState({tagInput: event.target.value})
  }

  onAddTask = event => {
    event.preventDefault()
    const {tagInput, taskInput} = this.state

    const newTask = {
      id: uudiv4(),
      tagInput,
      taskInput,
    }

    if (taskInput.length !== 0) {
      this.setState(prevState => ({
        taskList: [...prevState.taskList, newTask],
        taskInput: '',
        tagInput: tagsList[0].optionId,
      }))
    }
  }

  clickTagButton = id => {
    console.log(id)
    this.setState({activeTag: id})
  }

  render() {
    const {taskInput, tagInput, taskList, activeTag} = this.state
    console.log(activeTag)

    const filteredTasksList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(each => each.tagInput.toUpperCase() === activeTag)

    return (
      <div className="main">
        <form className="input-con" onSubmit={this.onAddTask}>
          <h1 className="input-con-head">Create a Task</h1>
          <label htmlFor="task">Task</label>
          <input
            value={taskInput}
            onChange={this.onChangeTask}
            id="task"
            type="text"
            placeholder="Enter the task here"
          />
          <label htmlFor="tags">Tags</label>
          <select id="tags" value={tagInput} onChange={this.onChangeTag}>
            {tagsList.map(each => (
              <option value={each.optionId} key={each.optionId}>
                {each.displayText}
              </option>
            ))}
          </select>
          <button type="submit">Add Task</button>
        </form>
        <div className="tasks-con">
          <h1>Tags</h1>
          <ul className="tag-list-con">
            {tagsList.map(eachTag => (
              <TagItem
                tagDetails={eachTag}
                key={eachTag.optionId}
                clickTagButton={this.clickTagButton}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          {taskList.length === 0 ? (
            <p>No Tasks Added Yet</p>
          ) : (
            <ul className="tasks-list-con">
              {filteredTasksList.map(eachTask => (
                <li className="task-item" key={eachTask.id}>
                  <p className="task">{eachTask.taskInput}</p>
                  <p className="tag">{eachTask.tagInput}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default CreatingTasks
