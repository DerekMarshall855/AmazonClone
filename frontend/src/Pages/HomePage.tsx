import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Actions/productActions';
import LoadingBox from '../Components/loadingBox';
import MessageBox from '../Components/messageBox';
import Product from '../Components/product';

const HomePage = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state:any) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])
    
    return (
        <div>
            {
                loading ? (
                    <LoadingBox></LoadingBox>
                ) : error ? (
                    <MessageBox variant="danger">{error}</MessageBox>
                ) : (
                    <div className="row center">
                        {
                            products.map((product : any) => (
                                <Product key={product._id} product={product}/>
                            ))
                        }
                    </div>
                )
            }
        </div>
        
    );
}

export default HomePage;