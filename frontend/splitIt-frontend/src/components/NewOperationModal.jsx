import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { addNewOperation } from "../features/groups/currentGroupSlice";
/* form with amount, partecipants, date*/

const NewOperationModal = () => {

    const dispatch = useDispatch();
    const {currentGroupData : groupData} = useSelector((state) => state.currentGroup);
    const {users, _id : id} = groupData;
    const {username : email} = useSelector((state) => state.user);
    // states for new operation form 
    const  [amount, setAmount] = useState(0);
    const [operationUsers, setOperationUsers] = useState([]);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addNewOperation({
            id : id,
            payer : email, 
            partecipants : operationUsers, 
            amount : amount, 
            date : new Date(date), 
            description
        }));
    };

    const userList = () => {
        return users.map((user) => {
                return (
                    <Form.Check
                        onChange={(e) => {
                            if(e.target.checked) {
                                setOperationUsers([...operationUsers, e.target.id]);
                            } else {
                                setOperationUsers(operationUsers.filter((user) => user != e.target.id));
                            }
                        }}
                        type="checkbox"
                        id={user}
                        label={user}
                        key = {user}
                    />)
                })
    }
    
    return (
        <Form onSubmit = {(e) => handleSubmit(e)}>
            <Form.Group className="mb-3">
                <Form.Label>Quantità</Form.Label>
                <Form.Control 
                    onChange = {(e) => {setAmount(e.target.value)}} 
                    placeholder="Quantità in $"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Partecipanti</Form.Label>
                {
                    userList()
                }
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Data</Form.Label>
                <Form.Control
                    onChange = {(e) => {setDate(e.target.value)}}  
                    type="date" 
                    placeholder="Data" />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Descrizione</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="descrizione"
                    onChange = {(e) => {setDescription(e.target.value)}} />
            </Form.Group>

            <Button type = "submit"> aggiungi operazione</Button>
        </Form>
    );
}
export default NewOperationModal;