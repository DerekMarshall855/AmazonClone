import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../Actions/userActions";
import LoadingBox from "../Components/loadingBox";
import MessageBox from "../Components/messageBox";
import { USER_UPDATE_PROFILE_RESET } from "../Constants/userConstants";

const ProfilePage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userSignin = useSelector((state: any) => state.userSignin);
    const {userInfo} = userSignin;
    const userDetails = useSelector((state: any) => state.userDetails);
    const {loading, error, user} = userDetails;
    const userUpdateProfile = useSelector((state: any) => state.userUpdateProfile);
    const {
        success: successUpdate,
        error: errorUpdate,
        loading: loadingUpdate,
    } = userUpdateProfile;
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user) {
            dispatch({type: USER_UPDATE_PROFILE_RESET});
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
        
    }, [dispatch, userInfo, user]);

    const submitHandler = (e: any) => {
        e.preventDefault();
        // dispatch update profile
        if(password !== confirmPassword) {
            alert('Password and Confirm Password do not match!');
        } else {
            dispatch(updateUserProfile({userId: user._id, name, email, password}));
        }
    }

    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div><h1>User Profile</h1></div>
                {
                    loading ? (<LoadingBox></LoadingBox>) :
                    error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                    <>
                        {loadingUpdate && <LoadingBox></LoadingBox>}
                        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
                        {successUpdate && <MessageBox variant="success">Profile Updated</MessageBox>}
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" placeholder="Enter Name" value={name} onChange={(e: any) => setName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input id="email" type="text" placeholder="Enter Email" value={email} onChange={(e: any) => setEmail(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input id="password" type="password" placeholder="Enter Password" onChange={(e: any) => setPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input id="confirmPassword" type="password" placeholder="Confirm Password" onChange={(e: any) => setConfirmPassword(e.target.value)}></input>
                        </div>
                        <div>
                            <label/>
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>
                }
            </form>
        </div>
    )
}

export default ProfilePage;