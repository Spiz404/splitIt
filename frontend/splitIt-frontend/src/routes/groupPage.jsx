import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { useEffect, useState, useCallback } from "react";
import { fetchCurrentGroupData, setCurrentGroup } from "../features/groups/currentGroupSlice";
import { Reloading } from "../icons";

const GroupPage = () => {
    
    const dispatch = useDispatch();
    const [invitationLink, setInvitationLink] = useState('');
    const [groupInvitationLinkError, setGroupInvitationLinkError] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const loggedUser = localStorage.getItem('user');

    useEffect(() => {
        // fetching currenyGroup from localStorage, to avoid application to break when page is refreshed
        const currentGroup = localStorage.getItem('currentGroup');
        if(currentGroup != null)
            dispatch(setCurrentGroup(currentGroup));
        dispatch(fetchCurrentGroupData(currentGroup));
        setRefresh(false);
        setInvitationLink('');

    }, [refresh]);
    

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

    const {currentGroup, isLoading, isError} = useSelector((state) => state.currentGroup);
    const {isLogged} = useSelector((state) => state.user); 
    const {currentGroupData : groupData} = useSelector((state) => state.currentGroup)
    
    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    if(isError) {
        return <h4>Error...</h4>
    }

    if (isLogged && Object.keys(groupData).length != 0)
        return (
            <>
                <div className="heading-container">
                <h2>{groupData.name}</h2> <div onClick = {() => setRefresh(true)}>
                    <Reloading />
                    </div>
                </div>    
                <div className="external-group-container">
                    <div className="group-user-container">
                        <h3>Users</h3>
                    {
                        Array.isArray(groupData.users) && groupData.users.map((user) => {
                            return <p key = {user} >{user}</p>
                        })
                    }
                    </div>
                    <div className="external-container-operations-debts">
                        <div className="debts-container">
                            <h3>Debts</h3>
                            
                            { groupData.debts.length == 0 ? 
                                <p> debiti non definiti</p>
                                :
                                <p>{groupData.debts}</p>
                            }
                            
                        </div>
                        <div className="operation-container">
                            <h3>Operations</h3>
                            { groupData.operations.length == 0 ? 
                                <p> nessuna operazione</p>
                                :
                                <p>{groupData.operations}</p>
                            }
                            
                        </div>
                    </div>
                </div>
                {
                    loggedUser == groupData.users[0] && invitationLink == '' &&
                    <p onClick = {() => {newLink()}} style = {{cursor : 'pointer'}}>crea link d'invito</p>

                }
                {
                    invitationLink != '' &&
                    <a href = {invitationLink}>{invitationLink}</a>
                }
                
            </>
        
        );

    return <h2> effettua il login</h2>;
}

export default GroupPage