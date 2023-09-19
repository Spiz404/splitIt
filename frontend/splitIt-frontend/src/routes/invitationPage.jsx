import { useSelector, useDispatch} from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import {Button} from 'react-bootstrap';

const InvitationPage = () => {

    const {isLogged}  = useSelector((state) => state.user);
    const {invitationLink} = useParams();
    const user = useSelector((state) => state.user.username); 
    const [invitationResult, setInvitationResult] = useState(-1);   
    
    useEffect(() => {
        if (localStorage.getItem('invitationResult') != null)
            setInvitationResult(localStorage.getItem('invitationResult'));

        if (!isLogged) localStorage.setItem('invitationLink', invitationLink);
        // get group infos by the invitation link and invitationLink expire date

    }, []);

    const handleClick = async () => {
        const response = await axios.post(
            'http://localhost:8080/group/invite',
            {
                link : invitationLink,
                user : user
            }
        );

        setInvitationResult(response.data.result);
        localStorage.setItem('invitationResult', response.data.result);
    };

    
    
    if (!isLogged) {
        return ("effettua il login per entrare nel gruppo");
    }

    if (invitationResult == 1) {
        return <p style = {{color : 'grey', fontStyle : 'italic'}}>Sei già nel gruppo</p>
    }

    if (invitationResult == 0) {
        return <p style = {{color : 'grey', fontStyle : 'italic'}}>Sei stato aggiunto al gruppo</p>
    }

    if (invitationResult == -1)
        return (
            <Button onClick = {() => handleClick()}> entra nel gruppo</Button>
        );
    
    
}

export default InvitationPage;