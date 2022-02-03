import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
// import Error from "../../Error/Error";
import Loading from "../Shared/Loading/Loading";
import Navigation from "../Shared/Navigation/Navigation";
import "./Login.css";

const Login = () => {
  const { user, signInWithGoogle, logInWithEmailandPassword, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const location = useLocation();

  const refferer = location?.state?.from || { pathname: "/" };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    logInWithEmailandPassword(email, password);
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (user) {
      history.replace(refferer);
    }
  }, [user]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <Navigation></Navigation>
      <Container fluid className="login-heading">
        {/* {error && <Error></Error>} */}
      </Container>

      <Container className="login-panel">
        <Row>
          {/* LOGIN FORM  */}
          <Col xs={12}>
            <h1 className="title text-center">Login</h1>
            <div className="login d-flex flex-column justify-content-center h-100  pb-5">
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group className=" mb-3" controlId="formBasicEmail">
                  <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-pill ps-4"
                      type="email"
                      placeholder="name@example.com"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <FloatingLabel controlId="floatingPassword" label="Password">
                    <Form.Control
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-pill ps-4"
                      type="password"
                      placeholder="Password"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Button variant="success" className="btn-green fw-bold  rounded-pill p-3 w-100" type="submit">
                  Log In
                </Button>
              </Form>
            </div>
          </Col>

          {/* THIRD PARTY LOGIN */}
          <Col xs={12}>
            <div className="d-flex justify-content-center align-items-center my-3 pt-2 pb-3 h-100">
              <p>--OR--</p>
            </div>
          </Col>
          <Col xs={12}>
            <h3 className="title text-center fw-bold">Login with</h3>
            <div className="d-flex justify-content-around align-items-center  h-100 pb-3">
              <button onClick={signInWithGoogle} className="btn btn-danger">
                Google
              </button>
            </div>
          </Col>
        </Row>

        <h6 className="my-3 pt-2 text-center">
          No Account yet?{" "}
          <NavLink className="btn-cursive" to={{ pathname: "/signup", state: { from: refferer } }}>
            Sign Up
          </NavLink>{" "}
          instead.
        </h6>
      </Container>
    </div>
  );
};

export default Login;
