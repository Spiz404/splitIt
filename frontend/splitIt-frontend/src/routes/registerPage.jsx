import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {useState} from 'react';

const RegisterPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const register = (e) => {
        e.preventDefault();
        axios(
            {
                method : 'POST',
                withCredentials : true,
                data : {
                    email : email,
                    password : password,
                    name : name,
                    surname : surname
                },
                url : 'http://localhost:8080/register'
            }
        ).then(
            (res) => console.log(res)
        )
        .catch(
            (err) => console.log(err)
        )
    };

    return (
        <Form onSubmit={(e) => register(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Indirizzo Email</Form.Label>
                <Form.Control value = {email} onChange = {(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                La tua email rimarrà per sempre privata
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control value = {name} onChange = {(e) => setName(e.target.value)} placeholder="Inserire nome" />
               
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control value = {surname} onChange = {(e) => setSurname(e.target.value)} placeholder="Inserire cognome" />
                
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control value = {password} onChange = {(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> Ripeti password </Form.Label>
                <Form.Control type="password" value = {repeatPassword} onChange = {(e) => setRepeatPassword(e.target.value)} placeholder="Ripeti Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}
export default RegisterPage