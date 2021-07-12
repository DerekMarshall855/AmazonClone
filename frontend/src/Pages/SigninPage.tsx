import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../Actions/userActions";
import MessageBox from '../Components/messageBox';
import LoadingBox from "../Components/loadingBox";

const SigninPage = (props : any) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';
    const userSignin = useSelector((state : any) => state.userSignin);
    const {userInfo, loading, error} = userSignin;

    const dispatch = useDispatch();

    const submitHandler = (e : any) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    useEffect(() => {
        if(userInfo){
            props.history.push(redirect);
        }
    }, [userInfo, props.history, redirect]);

    return(
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder="Enter Email" required onChange={e => setEmail(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter Password" required onChange={e => setPassword(e.target.value)}></input>
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Signin</button>
                </div>
                <div>
                    <label />
                    <div>
                        New customer? {' '}
                        <Link to={`/register?redirect=${redirect}`}>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SigninPage;