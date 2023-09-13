import { useDispatch, useSelector } from "react-redux"
import axios from 'axios';
import { useEffect, useState, useCallback } from "react";
import { fetchCurrentGroupData } from "../features/groups/currentGroupSlice";
import { Reloading } from "../icons";

const GroupPage = () => {
    
    const dispatch = useDispatch();
    
    const [refresh, setRefresh] = useState(false);

    
    // useEffect(() => {
    //     console.log("ALMENO QUI CI ARRIVO");
    //     dispatch(fetchCurrentGroupData(currentGroup));
    //     //setRefresh(false);
    // }, []);
    
    useEffect(() => {
        console.log("ma funziona o no sta cosa");
    }, []);
    const {currentGroup, isLoading, isError} = useSelector((state) => state.currentGroup);
    const {currentGroupData : groupData} = useSelector((state) => state.currentGroup);

    console.log('groupData', groupData);

    if (isLoading) {
        return <h4>Loading...</h4>;
    }

    if(isError) {
        return <h4>Error...</h4>
    }


    // return (
    //     <>
    //         <div className="heading-container">
    //         <h2>{groupData.name}</h2> <div onClick = {() => setRefresh(true)}>
    //             <Reloading />
    //             </div>
    //         </div>    
    //         <div className="external-group-container">
    //             <div className="group-user-container">
    //                 <h3>Users</h3>
    //             {
    //                 Array.isArray(groupData.users) && groupData.users.map((user) => {
    //                     return <p>{user}</p>
    //                 })
    //             }
    //             </div>
    //             <div className="external-container-operations-debts">
    //                 <div className="debts-container">
    //                     <h3>Debts</h3>
                        
    //                     { groupData.debts.length == 0 ? 
    //                         <p> debiti non definiti</p>
    //                         :
    //                         <p>{groupData.debts}</p>
    //                     }
                        
    //                 </div>
    //                 <div className="operation-container">
    //                     <h3>Operations</h3>
    //                     { groupData.operations.length == 0 ? 
    //                         <p> nessuna operazione</p>
    //                         :
    //                         <p>{groupData.operations}</p>
    //                     }
                        
    //                 </div>
    //             </div>
    //         </div>
           
            
    //     </>
       
    // );

    return <h1>sto impazzendo</h1>;
}

export default GroupPage