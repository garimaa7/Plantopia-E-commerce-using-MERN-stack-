import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useRouteMatch } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const ManageOrders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [show, setShow] = useState(false);
    const [updatingOrder, setUpdatingOrder] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetch(`http://localhost:5000/orders`)
            .then((res) => res.json())
            .then((data) => {
                setOrders(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, [updatingOrder]);

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

    const handleModalOpen = (id) => {
        setUpdatingOrder(id);
        setShow(true);
    };

    //UPDATE ORDER STATUS
    const handleStatusChangle = (status) => {
        const update = { status: status };
        setShow(false);
        fetch(`http://localhost:5000/orders/${updatingOrder}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.status == status) setUpdatingOrder("");
            })
            .catch((err) => console.log(err));
    };

    const { path, url } = useRouteMatch();

    return (
        <>
            <h5 className="text-muted mb-4 mt-0 p-0 fw-normal">{url}</h5>
            <div className="paper">
                <div className="paper-top">
                    <h3 className="border-bottom pb-3">
                        <i className="bi bi-cart-check"></i> Manage Orders
                    </h3>
                    <div className="paper-body table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Order Date</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Address</th>
                                    {/* <th scope="col">Unit Price</th> */}
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total Price</th>
                                    <th colSpan="2" scope="col">
                                        Action
                                    </th>
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
                                        <td>{order?.name}</td>
                                        <td>{order?.phone}</td>
                                        <td>{order?.address}</td>
                                        {/* <td>{order?.price}</td> */}
                                        <td>{order?.quantity}</td>
                                        <td>{order?.total}</td>
                                        <td>
                                            <i
                                                onClick={() => handleModalOpen(order?._id)}
                                                className="bi bi-pencil-square fs-5 p-1 px-2 rounded shadow text-green"
                                                title="Change Order Status"
                                            ></i>
                                        </td>
                                        <td>
                                            <i
                                                onClick={() => deleteOrder(order?._id)}
                                                className="bi bi-trash-fill fs-5 p-1 px-2 rounded shadow text-danger"
                                                title="Delete"
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* UPDATE ORDER STATUS MODAL  */}

            <>
                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {" "}
                            <i className="bi bi-pencil-square me-2"></i> Change Order Status
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button
                            onClick={() => handleStatusChangle("Shipped")}
                            className="btn-green mx-auto mb-2 d-block"
                        >
                            Shipped
                        </Button>
                        <Button
                            onClick={() => handleStatusChangle("Approved")}
                            className="btn-success mx-auto mb-2 d-block"
                        >
                            Approve
                        </Button>
                        <Button
                            onClick={() => handleStatusChangle("Pending")}
                            className="btn-primary mx-auto mb-2 d-block"
                        >
                            Pending
                        </Button>
                        {/* <Button
                            onClick={() => handleStatusChangle("Rejected")}
                            className="btn-danger mx-auto mb-2 d-block"
                        >
                            Reject
                        </Button> */}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    );
};

export default ManageOrders;
