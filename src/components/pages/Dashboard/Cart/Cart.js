import React, { useEffect, useState} from "react";
import { Switch, Route, useRouteMatch, NavLink  } from "react-router";
import PrivateRoute from "../../Shared/PrivateRoute/PrivateRoute";
import useAuth from "../../../../hooks/useAuth";
import { Button } from "react-bootstrap";
import Checkout from "./Checkout";

const Cart = ({product}) => {

    // const { _id} = product;
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/cart/user/${user?.uid}`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteOrder = (id) => {
        const shouldDelete = window.confirm("Do you really want to Delete this order?");
        if (!shouldDelete) return;
        fetch(`http://localhost:5000/cart/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.deletedCount === 1) {
                    setOrders(orders.filter((order) => order._id !== id));
                }
            })
            .catch((err) => console.log(err));
    };

    const checkOut = (id) => {
        fetch(`http://localhost:5000/cart/${id}/checkout`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {})
            .catch((err) => console.log(err));

            setOrders([]);
    };

    const { path, url } = useRouteMatch();

    return (
        <>
            <h5 className="text-muted mb-4 mt-0 p-0 fw-normal">{url}</h5>
            <div className="paper">
                <div className="paper-top">
                    <h3 className="d-block border-bottom pb-3">
                        <i className="bi bi-cart-check"></i> MyCart
                    </h3>
                    <div className="paper-body table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    {/* <th scope="col">Unit Price</th>  */}
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={order?._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {" "}
                                            <span>
                                                <img
                                                    className="order-img"
                                                    src={order?.productImg}
                                                    alt=""
                                                />
                                            </span>
                                            {order?.productName}
                                        </td>
                                        {/* <td>{order?.price}</td>  */}
                                        <td>{order?.quantity}</td>
                                        <td>{order?.total}</td>
                                        <td>
                                            <i
                                                onClick={() => deleteOrder(order?._id)}
                                                className="bi bi-trash-fill fs-5 p-1 px-2 rounded shadow text-danger"
                                                title="Delete"
                                            ></i>{" "}
                                        </td>
                                    </tr>
                                ))}
 
                            </tbody>
                        </table>

                        {/* <NavLink  to={`${url}/checkout`}>  */}
                          <Button variant="outline-warning" className="rounded-pill btn-cursive" onClick={() => checkOut(user?.uid)}>
                            Checkout
                          </Button>
                        {/* </NavLink> */}
                       
                    </div>
                </div>


            </div>
        </>
    );
};

export default Cart;
