const GroupItem = ({name, id}) => {
  return (
    <div className="groupItem">
        <h3>{name}</h3>
        <p>{id}</p>
    </div>
  )
}
export default GroupItem