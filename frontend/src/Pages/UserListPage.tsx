import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllUsers } from "../Actions/userActions";
import LoadingBox from "../Components/loadingBox";
import MessageBox from "../Components/messageBox";

const UserListPage = (props: any) => {
    const userDetails = useSelector((state: any) => state.userDetails);
    const {userLoading, userError, user} = userDetails;
    const userSignin = useSelector((state: any) => state.userSignin);
    const {userInfo} = userSignin;
    const userListAll = useSelector((state: any) => state.userListAll);
    const {loading, error, users} = userListAll;

    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch(listAllUsers(userInfo._id));
        } else {
            dispatch(listAllUsers(user._id));
        }
    }, [dispatch, user, userInfo]);

    return (
        <div>
            <h1>User List</h1>
            {userLoading ? (<LoadingBox></LoadingBox>) :
            userError ? (<MessageBox variant="danger">{userError}</MessageBox>) :
                <>
                    {loading ? (<LoadingBox></LoadingBox>) :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>PASSWORD</th>
                                    <th>ISADMIN</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user: any) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                        <td>
                                            <button type="button" className="small"
                                                onClick={() => {props.history.push(`/users/${user._id}`);}}>
                                                Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </>
            }
        </div>
    )
};

export default UserListPage;