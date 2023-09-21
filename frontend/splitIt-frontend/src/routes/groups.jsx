import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserGroups } from "../features/user/userSlice";
import GroupItem from "../components/GroupItem";
import {openModal, closeModal} from "../features/groups/groupModalSlice";
import { Reloading, Plus } from "../icons";
import NewGroupForm from "../components/NewGroupForm";
import Collapse from 'react-bootstrap/Collapse';
import Spinner from "react-bootstrap/Spinner";
import LoadingSpinner from "../components/LoadingSpinner";

const Groups = () => {
    
    const dispatch = useDispatch();
    const {isLogged, username} = useSelector((state) => state.user);
    const {isModalOpen} = useSelector((state) => state.groupModal);
    const [isRefresh, setRefresh] = useState(false);
    const {isCreationLoading, isCreationError, isCreationFulfilled} = useSelector((state) => state.groupModal);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        // clearing current group local storage item
        localStorage.removeItem('currentGroup');
        if(isLogged) dispatch(fetchUserGroups(username));
        dispatch(closeModal());
        setRefresh(false);
    }, [isLogged, isRefresh, isCreationFulfilled]);

    const {isLoadingGroupFetch, isLoadingGroupFetchError, groups} = useSelector((state) => state.user);
    
    if (!isLogged){
        return <h4> per poter visualizzare i tuoi gruppi, devi prima effettuare il login </h4>
    }

    if (isLoadingGroupFetch) {
        return ( 
            // <Spinner animation="border" role="status" className = "loading-spinner">
            //     <span className="visually-hidden">Loading...</span>
            // </Spinner>
            <LoadingSpinner/>
        );
    }

    if (isLoadingGroupFetchError) {
        return <h4> error... </h4>
    }

    if(isCreationLoading) {
        return <h4>Creazione gruppo...</h4>;
    }

    

    return (

        <>
            <div className = 'heading-container'>
                <h2>groups</h2>  
                <div onClick = {() => setRefresh(true)}>
                    <Reloading />
                </div>
                <div onClick = {() => 
                    dispatch(openModal())}>
                <Plus />
                </div>
            </div>
            <div className='external-container'>
                {
                    groups.length == 0 && !isModalOpen ?
                        <p style = {{fontStyle : 'italic', color : 'grey'}}> non sei in nessun gruppo</p> :
                        <div className="groups-container">
                            {
                                
                                isLogged && Array.isArray(groups) && groups.map((group) => {                                
                                    return <GroupItem key = {group._id} {...group}/>})
                                
                            }
                        
                        </div>
                }
                <Collapse in={isModalOpen}>
                    {/* <div>testo testo testo</div> */}
                    {/* isModalOpen &&   */}
                       <div>
                        <NewGroupForm setRefresh = {setRefresh}/>
                        </div>
                
                </Collapse>
                
            </div>
        </>
    );

}
export default Groups;