import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login, logout} from "../features/user/userSlice.js";
import { NavLink} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavComponent = (props) => {

    const dispatch = useDispatch();
    
    // check if there is a logged user 
    
    useEffect(() => {

        const loggedUser = localStorage.getItem('user');
        if(loggedUser) {
            dispatch(login({username : loggedUser}));
        }

    }, []);

    const {isLogged, username} = useSelector((state) => state.user);
    

    return (
        
        <Navbar expand="sm" className="bg-body-tertiary" >
        <Container fluid>
            {/* part of the navbar floating of right */}
            <Navbar.Brand href="#home">SplitIt</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id = "response-navbar-nav" className="justify-content-end">  
            <Nav className = "me-auto">
            
                {isLogged && <Nav.Link href="/groups">Gruppi</Nav.Link> }
            </Nav>
            {/* part of the navbar floating on right */}
            <Nav>

                { isLogged ? 
                
                <NavDropdown title={username} id="basic-nav-dropdown">
                    <NavDropdown.Item onClick = {() => dispatch(logout())}
                    >profilo</NavDropdown.Item>
                    {/* <NavDropdown.Divider /> */}
                    <NavDropdown.Item onClick = {() => dispatch(logout())}
                    style = {{color : 'red'}}>logout</NavDropdown.Item>
                </NavDropdown>
                    :
                    
                    <Nav.Link href="/login">login</Nav.Link>
                }
            
            </Nav>
            </Navbar.Collapse>
           

        </Container>
        </Navbar>
    
    );
}

export default NavComponent;

// old navbar

// <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
        //     <NavLink className="navbar-brand" to="/">SplitIt</NavLink>
        //     <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //         <span className="navbar-toggler-icon"></span>
        //     </button>
            
        //     { isLogged ? 
        //          <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul className="navbar-nav mr-auto">
        //                 <li className="nav-item active"> 
        //                     <NavLink className="nav-link" to="/groups">groups</NavLink>
        //                 </li>
        //             </ul>
        //         </div> 
        //         :
        //         <div className = 'collapse navbar-collapse'></div>
        //     }

        //     <div className="ml-auto">
        //     { isLogged ? 
        //             <div style = {{display : 'flex', flexDirection : 'row'}}>
        //                 <li className="nav-item">
        //                     <a className="nav-link" href="#">{username}</a>
                            
        //                 </li>
        //                 <button className="btn btn-light" onClick = {() => dispatch(logout())} style = {{fontSize : '10pt'}} >Logout</button>
        //             </div>
        //             :

        //             <li className="nav-item">
        //                 <NavLink to = '/login'>
        //                 <button className = 'btn btn-primary' href="/login">Login</button>
        //                 </NavLink>
        //             </li>
                
        //     }
        //     </div>
        // </nav>