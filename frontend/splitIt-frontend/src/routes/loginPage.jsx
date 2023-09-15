import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {useState} from 'react';

const  LoginPage = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(401);
  const login = async (e) => {
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
    
    }
    catch(err) {
      console.log(err.response.status);
      setStatus(401);
    } 


    // .then((res) => console.log(res))
    // .catch((err) => console.log(err))

    console.log("response", response);
    console.log(response.status);
  };

  return (
    <Form onSubmit={(e) => login(e)}>
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
      {/* <Form.Group className="mb-3">
        <Form.Control value='Hai già un account?'/>       
        </Form.Group> */}
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );

}

export default LoginPage;




