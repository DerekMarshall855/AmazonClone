import { ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signout } from '../Actions/userActions';

const defaultContainerProps = {
    heading: <Link className="brand" to="/">Amazon Clone</Link>,
};

//Default Typings
type ContainerProps = typeof defaultContainerProps;
function Header({ heading }: ContainerProps): ReactElement | null {
    const cart = useSelector((state : any) => state.cart);
    const {cartItems} = cart;
    const userSignin = useSelector((state : any) => state.userSignin);
    const {userInfo} = userSignin;

    const dispatch = useDispatch();

    const signoutHandler = () => {
        dispatch(signout());
    }

    return (
        <header className="row">
            <div>
                {heading}
            </div>
            <div>
                <Link to="/cart">Cart</Link>
                {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                )}
                {
                    userInfo ? (
                        <div className="dropdown">
                            <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i>{' '}</Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/profile">User Profile</Link>
                                </li>
                                <li>
                                    <Link to="/orderhistory">Order History</Link>
                                </li>
                                <li>
                                    <Link to="#signout" onClick={signoutHandler}>Sign Out</Link>
                                </li>  
                            </ul>
                        </div>
                    ) : (
                        <Link to="/signin">Sign In</Link>
                    )
                }
                {
                    userInfo && userInfo.isAdmin && (
                        <div className="dropdown">
                            <Link to="#admin">Admin {' '} <i className="fa fa-caret-down"></i></Link>
                            <ul className="dropdown-content">
                                <li>
                                    <Link to="/dashboard">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/productlist">Products</Link>
                                </li>
                                <li>
                                    <Link to="/orderlist">Orders</Link>
                                </li>
                                <li>
                                    <Link to="/userlist">Users</Link>
                                </li>  
                            </ul>
                        </div>
                    )
                }
            </div>
        </header>
    );
}
Header.defaultProps = defaultContainerProps;

export default Header;