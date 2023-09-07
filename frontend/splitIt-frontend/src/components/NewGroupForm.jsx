import { useDispatch, useSelector } from "react-redux";
import { createNewGroup } from "../features/groups/groupModalSlice";
import { closeModal } from "../features/groups/groupModalSlice";
const NewGroupForm = () => {

    const {username : email} = useSelector((state) => state.user);
    const dispatch = useDispatch(createNewGroup({}));

    const handleNewGroupSubmit = (e) => {
        e.preventDefault();
        console.log("sono qua dentro");
        const groupName = document.getElementById('groupName').value;
        
        dispatch(createNewGroup({email : email, name : groupName}));
        // closing new group form
        dispatch(closeModal());
    }

    return (
        <form onSubmit={() => NewGroupForm()}>
            <div className="form-group">
                <label htmlFor="groupName">Nome gruppo</label>
                <input className="form-control" id="groupName" aria-describedby="emailHelp" placeholder="Inserire nome nuovo gruppo"/>
                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
            </div>
            
            <button type="button" className="btn btn-primary">crea gruppo</button>
        </form>
    );
}
export default NewGroupForm;