import { useDispatch, useSelector } from "react-redux";
import { createNewGroup } from "../features/groups/groupModalSlice";
import { closeModal } from "../features/groups/groupModalSlice";

const NewGroupForm = ({setRefresh}) => {

    const {username : email} = useSelector((state) => state.user);
    const dispatch = useDispatch(createNewGroup({}));

    const handleNewGroupSubmit = async (e) => {
        e.preventDefault();
        //console.log("sono qua");
        const groupName = document.getElementById('groupName').value;
        
        await dispatch(createNewGroup({email : email, name : groupName}));
        // closing new group form
        setRefresh(true);
        //dispatch(closeModal());
    }

    return (
        
            <form onSubmit={(e) => handleNewGroupSubmit(e)}>
                <div className="form-group">
                    <label htmlFor="groupName">Nome gruppo</label>
                    <input className="form-control" id="groupName" aria-describedby="emailHelp" placeholder="Inserire nome nuovo gruppo"/>
                </div>
                
                <button type="submit" className="btn btn-primary">crea gruppo</button>
            </form>
    );
}
export default NewGroupForm;