// import React, { useEffect, useState } from "react";
// import { Col, Container, FloatingLabel, Form, Row, Button } from "react-bootstrap";
// import { useHistory, useParams, useRouteMatch } from "react-router";
// import useAuth from "../../../../hooks/useAuth";
// import Navigation from "../../Shared/Navigation/Navigation";
// // import ProductCard from "../../Shared/ProductCard/ProductCard";
// // import { BasketContext } from "../Dashboard/Cart/CartContext";

// const Checkout = () => {
//     const { user } = useAuth();
//     const { id } = useParams();
//     const history = useHistory();
//     const [product, setProduct] = useState({});
  
//     const [orders, setOrders] = useState([]);


//     const [orderData, setOrderData] = useState({ quantity: 1 });
//     const total = product?.price * orderData?.quantity;

//     useEffect(() => {
//         fetch(`http://localhost:5000/products/${id}`)
//             .then((res) => res.json())
//             .then((data) => setProduct(data))
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, [id]);

//     // const deleteOrder = (id) => {
//     //     const shouldDelete = window.confirm("Do you really want to Delete this order?");
//     //     if (!shouldDelete) return;
//     //     fetch(`http://localhost:5000/orders/${id}`, {
//     //         method: "DELETE",
//     //     })
//     //         .then((res) => res.json())
//     //         .then((data) => {
//     //             if (data?.deletedCount === 1) {
//     //                 setOrders(orders.filter((order) => order._id !== id));
//     //             }
//     //         })
//     //         .catch((err) => console.log(err));
//     // };


//     // const { path, url } = useRouteMatch();

//     const handleOnChange = (e) => {
//         const newData = { ...orderData };
//         newData[e.target.name] = e.target.value;
//         setOrderData(newData);
//         console.log(orderData);
//     };

//     const handleOrderSubmit = (e) => {
//         e.preventDefault();
//         const initialOrderData = {
//             name: user?.displayName,
//             uid: user?.uid,
//             productId: id,
//             productName: product?.title,
//             productImg: product?.img,
//             productPrice: product?.price,
//             orderDate: new Date().toLocaleDateString(),
//             email: user.email,
//             status: "Pending",
//         };
//         const submitData = {
//             ...initialOrderData,
//             ...orderData,
//             total: orderData.quantity * product.price,
//         };
//         e.target.reset();

//         fetch("http://localhost:5000/orders", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(submitData),
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data?._id) history.push("/");
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     };



//     return (
//         <>
//             <Navigation></Navigation>
//             <div className="Purchase pt-3">
//                 <Container>
//                     <Row>
//                         <Col>
   
//                         {/* <Col xs="12" md="6">
//                         <h5 className="text-muted mb-4 mt-0 p-0 fw-normal">{url}</h5>
//                         <div className="paper">
//                             <div className="paper-top">
//                                 <h3 className="d-block border-bottom pb-3">
//                                     <i className="bi bi-cart-check"></i> MyCart
//                                 </h3>
//                                 <div className="paper-body table-responsive">
//                                     <table className="table table-hover">
//                                         <thead>
//                                             <tr>
//                                                 <th scope="col">#</th>
//                                                 <th scope="col">Product Name</th>
//                                                 <th scope="col">Unit Price</th> 
//                                                 <th scope="col">Quantity</th>
//                                                 <th scope="col">Total Price</th>
//                                                 <th scope="col">Action</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {orders.map((order, index) => (
//                                                 <tr key={order?._id}>
//                                                     <td>{index + 1}</td>
//                                                     <td>
//                                                         {" "}
//                                                         <span>
//                                                             <img
//                                                                 className="order-img"
//                                                                 src={order?.productImg}
//                                                                 alt=""
//                                                             />
//                                                         </span>
//                                                         {order?.productName}
//                                                     </td>
//                                                     <td>{order?.price}</td> 
//                                                     <td>{order?.quantity}</td>
//                                                     <td>{order?.total}</td>
//                                                     <td>
//                                                         <i
//                                                             onClick={() => deleteOrder(order?._id)}
//                                                             className="bi bi-trash-fill fs-5 p-1 px-2 rounded shadow text-danger"
//                                                             title="Delete"
//                                                         ></i>{" "}
//                                                     </td>
//                                                 </tr>
//                                             ))}
                
//                                         </tbody>
//                                     </table>
//                                 </div>
//                                 </div>
//                                 </div> */}

//                             <div className="order-form text-start p-3">
//                                 <h2 className="fw-bold">Order Information</h2>
//                                 <hr />
//                                 <Form onSubmit={handleOrderSubmit}>
//                                     <Form.Group className=" mb-3" controlId="formBasicName">
//                                         <FloatingLabel
//                                             controlId="floatingName"
//                                             label="Full Name"
//                                             className="mb-3"
//                                         >
//                                             <Form.Control
//                                                 onChange={handleOnChange}
//                                                 className="rounded-pill ps-4"
//                                                 type="text"
//                                                 name="name"
//                                                 defaultValue={user?.displayName}
//                                                 placeholder="Full Name"
//                                                 required
//                                             />
//                                         </FloatingLabel>
//                                     </Form.Group>

//                                     <Form.Group className=" mb-3" controlId="formBasicEmail">
//                                         <FloatingLabel
//                                             controlId="floatingInput"
//                                             label="Email address"
//                                             className="mb-3"
//                                         >
//                                             <Form.Control
//                                                 onChange={handleOnChange}
//                                                 className="rounded-pill ps-4"
//                                                 type="email"
//                                                 defaultValue={user.email}
//                                                 placeholder="name@example.com"
//                                                 disabled
//                                                 required
//                                             />
//                                         </FloatingLabel>
//                                     </Form.Group>

//                                     <Form.Group className="mb-3" controlId="formBasic">
//                                         <FloatingLabel controlId="floatingP" label="Phone">
//                                             <Form.Control
//                                                 onChange={handleOnChange}
//                                                 className="rounded-pill ps-4"
//                                                 type="text"
//                                                 name="phone"
//                                                 placeholder="Phone"
//                                                 required
//                                             />
//                                         </FloatingLabel>
//                                     </Form.Group>

//                                     <Form.Group className="mb-3" controlId="formBasic">
//                                         <FloatingLabel controlId="floating" label="Address">
//                                             <Form.Control
//                                                 onChange={handleOnChange}
//                                                 className="rounded-pill ps-4"
//                                                 type="text"
//                                                 name="address"
//                                                 placeholder="Address"
//                                                 required
//                                             />
//                                         </FloatingLabel>
//                                     </Form.Group>

//                                     <Form.Group className="mb-3" controlId="formBasic">
//                                         <FloatingLabel controlId="floating" label="Quantity">
//                                             <Form.Control
//                                                 onChange={handleOnChange}
//                                                 className="rounded-pill ps-4"
//                                                 type="number"
//                                                 name="quantity"
//                                                 defaultValue="1"
//                                                 placeholder="Quantity"
//                                                 required
//                                             />
//                                         </FloatingLabel>
//                                     </Form.Group>

//                                     <Button
//                                         variant="success"
//                                         className="btn-green btn-cursive fw-bold rounded-pill p-3 w-100"
//                                         type="submit"
//                                     >
//                                         Place Order
//                                     </Button>
//                                     <br></br>
//                                     <br></br>
//                                     <br></br>

//                                 </Form>


//                                 <hr />
//                                     <h1 className="text-green text-cursive">Total: $ {total}</h1>
//                             </div>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
//         </>
//     );
// };

// export default Checkout;

