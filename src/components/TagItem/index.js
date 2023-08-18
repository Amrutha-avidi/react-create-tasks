import './index.css'

const TagItem = props => {
  const {tagDetails, onClickTag} = props
  const {displayText, optionId, isActive} = tagDetails

  const onClickTagItem = () => {
    onClickTag(optionId)
  }
  const buttonStyle = isActive ? 'active' : null
  console.log(isActive)

  return (
    <li className="tag">
      <button type="button" className={buttonStyle} onClick={onClickTagItem}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
