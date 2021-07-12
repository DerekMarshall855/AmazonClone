import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Actions/cartActions";
import CheckoutSteps from "../Components/checkoutSteps"

const ShippingAddressPage = (props: any) => {
    const userSignin = useSelector((state: any) => state.userSignin);
    const {userInfo} = userSignin;
    if (!userInfo) {
        props.history.push('/signin');
    }
    const cart = useSelector((state: any) => state.cart);
    const {shippingAddress} = cart;
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();

    const submitHandler = (e: any) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
        props.history.push('/payment');
        // TODO: dispatch save shipping address action
    }


    return (
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" placeholder="Enter Full Name" value={fullName} onChange={(e : any) => setFullName(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder="Enter Address" value={address} onChange={(e : any) => setAddress(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" placeholder="Enter City" value={city} onChange={(e : any) => setCity(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input type="text" id="postalCode" placeholder="Enter Postal Code" value={postalCode} onChange={(e : any) => setPostalCode(e.target.value)} required></input>
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" placeholder="Enter Full Name" value={country} onChange={(e : any) => setCountry(e.target.value)} required></input>
                </div>
                <div>
                    <label/>
                    <button className="primary" type="submit">Continue</button>
                </div>
            </form>
        </div>
    )
}

export default ShippingAddressPage;