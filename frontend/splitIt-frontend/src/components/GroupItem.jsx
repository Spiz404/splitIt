import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setCurrentGroup } from "../features/groups/currentGroupSlice";

const GroupItem = ({name, id}) => {
  
  const [isHover, setIsHover] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentGroup(id));
  };

  return (
    <div className="groupItem" onMouseEnter = {() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <NavLink to={`/groups/${name}`}><h3 onClick = {() => handleClick()}>{name}</h3></NavLink>
        <p>{id}</p>
        { isHover && 
          <button className="btn btn-danger" style = {{width : '75%', margin : '1rem', borderRadius : '6px'}}>cancella gruppo</button>}
    </div>
  )
}
export default GroupItem