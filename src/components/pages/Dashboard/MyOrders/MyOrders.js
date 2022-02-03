import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const MyOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/orders/user/${user?.uid}`)
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
        fetch(`http://localhost:5000/orders/${id}`, {
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

    const { path, url } = useRouteMatch();

    return (
        <>
            <h5 className="text-muted mb-4 mt-0 p-0 fw-normal">{url}</h5>
            <div className="paper">
                <div className="paper-top">
                    <h3 className="d-block border-bottom pb-3">
                        <i className="bi bi-cart-check"></i> MyOrders
                    </h3>
                    <div className="paper-body table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Status</th>
                                    {/* <th scope="col">Name</th> */}
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    {/* <th scope="col">Unit Price</th> */}
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
                                        <td>{order?.orderDate}</td>
                                        <td>{order?.status}</td>
                                        {/* <td>{order?.name}</td> */}
                                        <td>{order?.phone}</td>
                                        <td>{order?.address}</td>
                                        {/* <td>{order?.price}</td> */}
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
                                {/* <tr key={order?._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{order?.uid}</td>
                  <td>{order?.email}</td>
                  <td>{order?.name}</td>
                </tr>; */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyOrders;
