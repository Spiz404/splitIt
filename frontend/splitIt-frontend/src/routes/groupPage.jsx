import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { useEffect, useState, useCallback } from "react";
import { fetchCurrentGroupData, setCurrentGroup } from "../features/groups/currentGroupSlice";
import { Reloading, Link, Plus } from "../icons";
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import LoadingSpinner from "../components/LoadingSpinner";
import NewOperationModal from "../components/NewOperationModal";


const GroupPage = () => {
    
    
    const dispatch = useDispatch();
    const [invitationLink, setInvitationLink] = useState('');
    const [groupInvitationLinkError, setGroupInvitationLinkError] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [operationModal, setOperationModal] = useState(false);

    const loggedUser = localStorage.getItem('user');
    
    useEffect(() => {
        // retrieving currentGroup from localStorage, to avoid application to break when page is refreshed
        const currentGroup = localStorage.getItem('currentGroup');
        if(currentGroup != null)
            dispatch(setCurrentGroup(currentGroup));
        dispatch(fetchCurrentGroupData(currentGroup));
        setRefresh(false);
        setInvitationLink('');

    }, [refresh]);

    // backend request for a new invite link for the group
    const newLink = async () => {
        try {
            const response = await axios.get(
                `http://localhost:8080/group/invite?group=${currentGroup}`);
            
            setInvitationLink(response.data);
        }
        catch(error) {
            setGroupInvitationLinkError(true);
            console.log(error);
        }
    };

    // tooltip for invite link button
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          {props.text}
        </Tooltip>
    );
    
    // invite link button 
    const inviteLinkButton = () => (

        <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip({text : "genera link invito"})}
        >
            <div onClick = {() => newLink()}>
                <Link />
            </div>
        </OverlayTrigger>

    );

    const addOperationButton = () => (
        <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderTooltip({text : "aggiungi operazione al gruppo"})}
    >
        <div onClick = {() => {setOperationModal(true)}}>
            <Plus />
        </div>
    </OverlayTrigger>
    
    );

    // users container
    const UserContainer = () => (
        <div className="group-user-container">
            <h3>Users</h3>
            {
                Array.isArray(groupData.users) && groupData.users.map((user) => {
                    return <p key = {user} >{user}</p>
                })
            }
        </div>
    );

    // debts container
    const DebtsContainer = () => (
        <div className="debts-container">
            <h3>Debts</h3>
                            
            { groupData.debts.length == 0 ? 
                <p> debiti non definiti</p>
                :
                groupData.debts.map((debt) => {
                    
                    if (debt.creditor == loggedUser || debt.debt < 0)
                        return (
                            <p> 
                                {debt.debt < 0 ? debt.creditor : debt.debitor} ti deve 
                                {debt.debt < 0 ? debt.debt * -1 : debt.debt}$
                            </p>)
                            
                    if (debt.debitor == loggedUser)
                        return <p> devi {debt.debt }$ a {debt.creditor} </p>
                })
            }
                            
        </div>
    );
    
    // operations container
    const OperationContainer = () => (
        <div className="operation-container">
            <div className="heading-container"> <h3 style = {{marginRight : '0'}}>Operations</h3> {addOperationButton()}</div>

            { groupData.operations.length == 0 ? 
                <p> nessuna operazione</p>
                :
                groupData.operations.map((operation) => {
                    return <p>{operation.payer} {operation.description} {operation.amount}$</p>
                })
            }
                            
        </div>
    );
   
    

    const {currentGroup, isLoading, isError} = useSelector((state) => state.currentGroup);
    const {isLogged} = useSelector((state) => state.user); 
    const {currentGroupData : groupData} = useSelector((state) => state.currentGroup)
    
    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if(isError) {
        return <h4 className = "page-error">Error...</h4>
    }

    if (isLogged && Object.keys(groupData).length != 0)
        return (
            <>
                <div className="heading-container">
                <h2>{groupData.name}</h2> 
                <div onClick = {() => setRefresh(true)}>
                    <Reloading />
                </div>

                {
                    loggedUser == groupData.users[0] && invitationLink == '' &&
                    inviteLinkButton()
                }

                </div>    
                <div className="external-group-container">
                    
                    <UserContainer/>

                    <div className="external-container-operations-debts">
                    
                        <DebtsContainer/>
                     
                        <OperationContainer/>
                        
                    </div>

                </div>
                
                {
                    // if generated, showing invite link
                    invitationLink != '' &&
                    <a style = {{color : "grey"}} href = {invitationLink}>{invitationLink}</a>
                }

                {
                    operationModal &&
                    <NewOperationModal/>
                }
                
            </>
        
        );

    return <h2> effettua il login</h2>;
}

export default GroupPage