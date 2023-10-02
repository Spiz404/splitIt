import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {useState} from 'react';
import {login} from '../features/user/userSlice';
import {useDispatch} from 'react-redux';
import { NavLink } from "react-router-dom";
const  LoginPage = () => {

  const dispatch = useDispatch();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(401);
  const [loginError, setLoginError] = useState(false);

  
  const loginUser = async (e) => {
    
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', 
      {email : email, password : password},
      { withCredentials : true });

      console.log(response);
      setStatus(response.status);
      setLoginError(false);
      console.log("set-cookie", response.headers['set-cookie']);
      dispatch(login({username : response.data}));
      
    }
    catch(err) {
      console.log(err.response.status);
      setLoginError(true);
      setStatus(401);
    } 

    
  };

  return (
    <>
    <Form onSubmit={(e) => loginUser(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Indirizzo email </Form.Label>
        <Form.Control onChange = {(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" value={email}/>


        <Form.Text className="text-muted">
          La tua email rimarrà per sempre privata
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onChange = {(e) => setPassword(e.target.value)} type="password" placeholder="Password" value={password}/>
         
      </Form.Group>
      { loginError && <p style = {{color : "red"}}> Credenziali errate </p> }
      <Form.Group className="mb-3">
        <NavLink to = '/register'> Non hai un account? Registrati </NavLink>
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    
    </>

  );

}

export default LoginPage;




