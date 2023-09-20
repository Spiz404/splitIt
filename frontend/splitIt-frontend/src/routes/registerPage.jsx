import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import {useState, useEffect} from 'react';
import { NavLink } from "react-router-dom";
import { InputGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setRegistrationFulfilled } from "../features/registration/registrationSlice"
const RegisterPage = () => {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [validated, setValidated] = useState(false);

    const register = async (e) => {


        e.preventDefault();
        let passwordError = false;

        if (password != repeatPassword) {
            console.log("setting password error");
            passwordError = true;
            setFormErrors(
                {
                    ...formErrors,
                    password : "Le password non coincidono"
                }
            );

            setValidated(false);
        }
        else {
            passwordError = false;
          
                setFormErrors(
                    {
                        password : null
                    }
                )
     

            try {
                let emailError = false;
                const response = await axios(
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
                        });
                
                const {data} = response;

                if (data.ret == 1) {
                    emailError = true;
                    console.log("errore email");
                    if(passwordError)
                        setFormErrors(
                            {
                                password : "Le password non coincidono",
                                email : "Email già in utilizzo"
                            }    
                        )
                    else 
                        setFormErrors(
                            {
                                password : null,
                                email : "Email già in utilizzo"
                            })
                    setValidated(false);
                }

                else {

                    console.log("no email error");
                    setValidated(true);
                    if (passwordError)
                        setFormErrors({
                            password : "Le password non coincidono",
                            email : null
                        });
                    else 
                    setFormErrors({
                        password : null,
                        email : null
                    });
                }

                dispatch(setRegistrationFulfilled());
                
            }   
            catch(error) {
                console.log(error);
            }      
        }
       
    };

    return (
        <Form onSubmit={(e) => register(e)} validated={validated}>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Indirizzo Email</Form.Label>
                <InputGroup hasValidation>
                    <Form.Control isInvalid = {!!formErrors.email} required value = {email} onChange = {(e) => setEmail(e.target.value)} type="email" placeholder="Inserire email" />
                    <Form.Control.Feedback type="invalid">
                        {formErrors.email}
                    </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
        
            <Form.Group className="mb-3">
                <Form.Label>Nome</Form.Label>
                <Form.Control required value = {name} onChange = {(e) => setName(e.target.value)} placeholder="Inserire nome" />
               
            </Form.Group>


            <Form.Group className="mb-3">
                <Form.Label>Cognome</Form.Label>
                <Form.Control required value = {surname} onChange = {(e) => setSurname(e.target.value)} placeholder="Inserire cognome" />
                
            </Form.Group>


            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control isInvalid = {!!formErrors.password} 
                    required 
                    value = {password} 
                    onChange = {(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="Password" 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordRepeat">
                <Form.Label> Ripeti password </Form.Label>
                <Form.Control 
                    isInvalid = {!!formErrors.password} 
                    required 
                    type="password" 
                    value = {repeatPassword} 
                    onChange = {(e) => setRepeatPassword(e.target.value)} 
                    placeholder="Ripeti Password" 
                />
                <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
                <NavLink to = '/login'> Hai già un account? Effettua il login </NavLink>
            </Form.Group>
            <Button variant="primary" type="submit">
                Registrati
            </Button>
        </Form>
    );
}
export default RegisterPage