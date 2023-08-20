const TagItem = props => {
  const {tagDetails, clickTagButton} = props
  const {optionId, displayText} = tagDetails

  const activateTag = () => {
    clickTagButton(optionId)
  }

  return (
    <li className="tag-item">
      <button className="tag-button" type="button" onClick={activateTag}>
        {displayText}
      </button>
    </li>
  )
}
export default TagItem
