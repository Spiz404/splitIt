import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { setCurrentGroup } from "../features/groups/currentGroupSlice";
import Card from 'react-bootstrap/Card';

const GroupItem = ({name, id}) => {
  
  const [isHover, setIsHover] = useState(false);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setCurrentGroup(id));
    localStorage.setItem('currentGroup', id);
  };

  return (
    // <div className="groupItem" onMouseEnter = {() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
    //     <NavLink to={`/groups/${name}`}><h3 onClick = {() => handleClick()}>{name}</h3></NavLink>
    //     <p>{id}</p>
    //     { isHover && 
    //       <button className="btn btn-danger" style = {{width : '75%', margin : '1rem', borderRadius : '6px'}}>cancella gruppo</button>}
    // </div>
    <Card className = 'groupCard' >
    <Card.Body>
      <Card.Title style = {{textAlign : 'center'}} onClick = {() => handleClick()}><Nav.Link href = {`/groups/${name}`}>{name}</Nav.Link></Card.Title>
      {/* <Card.Subtitle className="mb-2 text-muted" style = {{textAlign : 'center'}}>Card Subtitle</Card.Subtitle> */}
      {/* <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text> */}
      {/* <Card.Link href="#">Card Link</Card.Link>
      <Card.Link href="#">Another Link</Card.Link> */}
    </Card.Body>
  </Card>

  )
}
export default GroupItem