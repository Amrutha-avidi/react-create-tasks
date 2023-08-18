import {Component} from 'react'
import {v4 as uudiv4} from 'uuid'

import TagItem from '../TagItem'
import TaskItem from '../TaskItem'

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

class Tasks extends Component {
  state = {
    taskInput: '',
    tagInput: '',
    activeTagId: '',
    tasksList: [],
    newList: tagsList,
  }

  onAddTask = event => {
    event.preventDefault()
    const {taskInput, tagInput} = this.state

    const newTask = {
      id: uudiv4(),
      taskInput,
      tagInput,
    }

    this.setState(prevState => ({
      tasksList: [...prevState.tasksList, newTask],
      taskInput: '',
      tagInput: tagsList[0].displayText,
    }))
  }

  onClickTag = id => {
    const {tasksList} = this.state
    const findItem = tasksList.filter(each =>
      each.tagInput.toUpperCase().includes(id),
    )
    const filteredList = findItem.map(eachItem => {
      if (eachItem.tagInput.toUpperCase().includes(id)) {
        return {...eachItem}
      }
      return null
    })
    this.setState({newList: filteredList, activeTagId: id})
  }

  onChangeTask = event => {
    this.setState({taskInput: event.target.value})
  }

  onChangeTags = event => {
    this.setState({tagInput: event.target.value})
  }

  render() {
    const {tagInput, taskInput, tasksList, newList, activeTagId} = this.state
    const filteredList = tasksList.filter(each =>
      each.tagInput.toUpperCase().includes(activeTagId),
    )

    return (
      <div className="main">
        <form className="input-and-select" onSubmit={this.onAddTask}>
          <h1>Create a Task</h1>
          <div className="input-container">
            <label htmlFor="task">Task</label>
            <input
              id="task"
              type="text"
              placeholder="Enter the task here"
              value={taskInput}
              onChange={this.onChangeTask}
            />
          </div>
          <div className="select-container">
            <label htmlFor="tags">Tags</label>
            <select id="tags" value={tagInput} onChange={this.onChangeTags}>
              {newList.map(eachTag => (
                <option key={eachTag.optionId}>{eachTag.displayText}</option>
              ))}
            </select>
          </div>
          <div>
            <button className="add-button" type="submit">
              Add Task
            </button>
          </div>
        </form>
        <div className="tags-and-tasks">
          <h1 className="tags-head">Tags</h1>
          <ul>
            {tagsList.map(eachTag => (
              <TagItem
                tagDetails={eachTag}
                key={eachTag.optionId}
                onClickTag={this.onClickTag}
                isActive={eachTag.optionId === activeTagId}
              />
            ))}
          </ul>
          <h1 className="tags-head">Tasks</h1>
          {filteredList.length === 0 ? (
            <p className="error-msg">No Tasks Added Yet</p>
          ) : (
            <ul className="task-list">
              {filteredList.map(eachTask => (
                <TaskItem taskDetails={eachTask} key={eachTask.id} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}
export default Tasks
