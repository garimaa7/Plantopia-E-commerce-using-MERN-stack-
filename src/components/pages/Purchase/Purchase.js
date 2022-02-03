import React, { useEffect, useState } from "react";
import { Col, Container, FloatingLabel, Form, Row, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import useAuth from "../../../hooks/useAuth";
import Navigation from "../Shared/Navigation/Navigation";
import "./Purchase.css";


const Purchase = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState({});


    const [orderData, setOrderData] = useState({ quantity: 1 });
    const total = product?.price * orderData?.quantity;

    useEffect(() => {
        fetch(`http://localhost:5000/products/${id}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleOnChange = (e) => {
        const newData = { ...orderData };
        newData[e.target.name] = e.target.value;
        setOrderData(newData);
        console.log(orderData);
    };

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        const initialOrderData = {
            name: user?.displayName,
            uid: user?.uid,
            productId: id,
            productName: product?.title,
            productImg: product?.img,
            productPrice: product?.price,
            orderDate: new Date().toLocaleDateString(),
            email: user.email,
            status: "Pending",
        };
        const submitData = {
            ...initialOrderData,
            ...orderData,
            total: orderData.quantity * product.price,
        };
        e.target.reset();

        fetch("http://localhost:5000/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?._id) history.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // ADD TO CART

    const popup =() =>{
        const initialOrderData = {
            name: user?.displayName,
            uid: user?.uid,
            productId: id,
            productName: product?.title,
            productImg: product?.img,
            productPrice: product?.price,
            orderDate: new Date().toLocaleDateString(),
            email: user.email,
            status: "Pending",
        };
        const submitData = {
            ...initialOrderData,
            ...orderData,
            total: orderData.quantity * product.price,
        };

        fetch("http://localhost:5000/Cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(submitData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?._id) history.push("/");
            })
            .catch((err) => {
                console.log(err);
            });
            
        alert("Added To Cart")
    }


    return (
        <>
            <Navigation></Navigation>
            <div className="Purchase pt-3">
                <Container>
                    <Row>
                        <Col xs="12" md="6">
                            <div className="product-img">
                                <img src={product?.img} alt="" />
                            </div>
                        </Col>
                        <Col xs="12" md="6">
                            <div className="product-details">
                                <h1>{product?.title}</h1>

                                <h1 className="price text-green">Rs. {product?.price}</h1>
                                <hr />
                                <p className="text-muted">{product.desc}</p>
                                <hr />
                                <p className="text-muted">Type: {product.type}</p>
                                <hr />
                                <p className="text-muted">Care: {product.care}</p>
                                <hr />
                                <p className="text-muted">Light: {product.light}</p>
                                <hr />
                                <p className="text-muted">Watering: {product.water}</p>
                                <hr />
                            </div>
                            <div className="order-form text-start p-3">
                                <h2 className="fw-bold">Order Information</h2>
                                <hr />
                                <Form onSubmit={handleOrderSubmit}>
                                    <Form.Group className=" mb-3" controlId="formBasicName">
                                        <FloatingLabel
                                            controlId="floatingName"
                                            label="Full Name"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                onChange={handleOnChange}
                                                className="rounded-pill ps-4"
                                                type="text"
                                                name="name"
                                                defaultValue={user?.displayName}
                                                placeholder="Full Name"
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className=" mb-3" controlId="formBasicEmail">
                                        <FloatingLabel
                                            controlId="floatingInput"
                                            label="Email address"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                onChange={handleOnChange}
                                                className="rounded-pill ps-4"
                                                type="email"
                                                defaultValue={user.email}
                                                placeholder="name@example.com"
                                                disabled
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasic">
                                        <FloatingLabel controlId="floatingP" label="Phone">
                                            <Form.Control
                                                onChange={handleOnChange}
                                                className="rounded-pill ps-4"
                                                type="text"
                                                name="phone"
                                                placeholder="Phone"
                                                minLength="10"
                                                maxLength="10"
                                                pattern="0-9"
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasic">
                                        <FloatingLabel controlId="floating" label="Address">
                                            <Form.Control
                                                onChange={handleOnChange}
                                                className="rounded-pill ps-4"
                                                type="text"
                                                name="address"
                                                placeholder="Address"
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasic">
                                        <FloatingLabel controlId="floating" label="Quantity">
                                            <Form.Control
                                                onChange={handleOnChange}
                                                className="rounded-pill ps-4"
                                                type="number"
                                                name="quantity"
                                                defaultValue="1"
                                                placeholder="Quantity"
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>

                                    <Button
                                        variant="success"
                                        className="btn-green btn-cursive fw-bold rounded-pill p-3 w-100"
                                        type="submit"
                                    >
                                        Place Order
                                    </Button>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                </Form>

                                <Button
                                        variant="grey"
                                        className="btn-warning btn-cursive fw-bold rounded-pill p-3 w-100"
                                        onClick={popup}

                                    >
                                        Add To Cart
                                </Button>
                                


                                <hr />
                                    <h1 className="text-green text-cursive">Total: Rs {total}</h1>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default Purchase;
