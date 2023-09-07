import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserGroups } from "../features/user/userSlice";
import GroupItem from "../components/GroupItem";
import {openModal, closeModal} from "../features/groups/groupModalSlice";
import { Reloading } from "../icons";
import NewGroupForm from "../components/NewGroupForm";


const Groups = () => {
    
    const dispatch = useDispatch();
    const {isLogged, username} = useSelector((state) => state.user);
    const {isModalOpen} = useSelector((state) => state.groupModal);
    console.log(isModalOpen);
    const [isRefresh, setRefresh] = useState(false);
    
    useEffect(() => {
        console.log(username);
        if(isLogged) dispatch(fetchUserGroups(username));
        
        setRefresh(false);
    }, [isLogged, isRefresh]);

    const {isLoadingGroupFetch, isLoadingGroupFetchError, groups} = useSelector((state) => state.user);
    
    if (!isLogged){
        return <h4> per poter visualizzare i tuoi gruppi, devi prima effettuare il login </h4>
    }

    if (isLoadingGroupFetch){
        return <h4> loading... </h4>
    }

    if (isLoadingGroupFetchError){
        return <h4> error... </h4>
    }
 
    console.log("groups", groups);

    return (

        <>
            <div className = 'heading-container'>
                <h2>groups</h2>  
                <div onClick = {() => setRefresh(true)}>
                <Reloading />
                </div>
            </div>
            <div className='external-container'>
                <div className="groups-container">
                    {
                        isLogged && groups.map((group) => {
                            return <GroupItem key = {group._id} {...group}/>})
                    }
                
                </div>
                {
                    isModalOpen ?  
                        <NewGroupForm />
                    : 
                        <button className="btn btn-primary add-group-button" onClick = {() => dispatch(openModal())}>crea gruppo</button>

                }
                
            </div>
            
        </>
    );

}
export default Groups;