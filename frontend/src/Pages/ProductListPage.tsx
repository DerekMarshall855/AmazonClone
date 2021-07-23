import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Actions/productActions";
import LoadingBox from "../Components/loadingBox";
import MessageBox from "../Components/messageBox";

const ProductListPage = (props: any) => {
    const dispatch = useDispatch();
    const productList = useSelector((state:any) => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts());
    }, [dispatch])

    return (
        <div>
            <h1>Product List</h1>
                {loading ? (<LoadingBox></LoadingBox>) :
                error ? (<MessageBox variant="danger">{error}</MessageBox>) :
                (
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>BRAND</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                <th>COUNTINSTOCK</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product: any) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>{product.countInStock}</td>
                                    <td>
                                        <button type="button" className="small"
                                            onClick={() => {props.history.push(`/product/${product._id}`);}}>
                                            Details
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>
    )
};

export default ProductListPage;