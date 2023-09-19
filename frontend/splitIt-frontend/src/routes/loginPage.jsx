import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {useState} from 'react';
import {login} from '../features/user/userSlice';
import {useDispatch} from 'react-redux';

const  LoginPage = () => {

  const dispatch = useDispatch();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(401);
  const [loginError, setLoginError] = useState(false);

  
  const loginUser = async (e) => {
    e.preventDefault();
    try {

      const response = await axios(
        {
          method : 'POST',
          data : {
            email : email, 
            password : password
          },
          withCredentials : true,
          url : 'http://localhost:8080/login',
        }
      )
      setStatus(response.status);
      setLoginError(false);
      
      dispatch(login({username : response.data}));
      console.log("response", response);
      console.log(response.status);
      
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
      { loginError && <p style = {{color : "red"}}> Credenziali errate </p>}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
    </>

  );

}

export default LoginPage;




