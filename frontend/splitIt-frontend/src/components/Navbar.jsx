import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {login, logout} from "../features/user/userSlice.js";
import { NavLink} from 'react-router-dom';
const Navbar = (props) => {

    const dispatch = useDispatch();
    
    const {isLogged, username} = useSelector((state) => state.user);
    
   
    return (
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light nav">
            <NavLink className="navbar-brand" to="/">SplitIt</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            { isLogged ? 
                 <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active"> 
                            <NavLink className="nav-link" to="/groups">groups</NavLink>
                        </li>
                    </ul>
                </div> 
                :
                <div className = 'collapse navbar-collapse'></div>
            }

            <div className="ml-auto">
            { isLogged ? 
                    <div style = {{display : 'flex', flexDirection : 'row'}}>
                        <li className="nav-item">
                            <a className="nav-link" href="#">{username}</a>
                            
                        </li>
                        <button className="btn btn-light" onClick = {() => dispatch(logout())} style = {{fontSize : '10pt'}} >Logout</button>
                    </div>
                    :

                    <li className="nav-item">
                        <button className = 'btn btn-primary' href="/login" onClick = {() => dispatch(login({username : 'lorespiz03@gmail.com'}))}>Login</button>
                    </li>
                
            }
            </div>
        </nav>
        
    );
}

export default Navbar;