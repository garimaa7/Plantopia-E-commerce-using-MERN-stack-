import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Button, FloatingLabel } from "react-bootstrap";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loading from "../Shared/Loading/Loading";
import Navigation from "../Shared/Navigation/Navigation";
// import Error from "../../Error/Error";
import "./Signup.css";

const Signup = () => {
  const { user, signInWithGoogle, createAccountWithEmailPassword, setError, isLoading } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();
  const location = useLocation();

  const refferer = location?.state?.from || { pathname: "/" };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      createAccountWithEmailPassword(email, password, name);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setError("Password Does Not Match");
    }
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
      <Container fluid className="signup-heading">
        {/* {error && <Error></Error>} */}
      </Container>

      <Container className="signup-panel">
        <Row>
          {/* SIGN UP FORM  */}
          <Col xs={12}>
            <h1 className="title text-center">Sign Up</h1>
            <div className="signup d-flex flex-column justify-content-center h-100 pb-5">
              <Form onSubmit={handleSignupSubmit}>
                <Form.Group className=" mb-3" controlId="formBasicName">
                  <FloatingLabel controlId="floatingName" label="Full Name" className="mb-3">
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-pill ps-4"
                      type="text"
                      placeholder="Full Name"
                      maxlength="85" 
                      pattern="^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

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
                      minLength="5"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                  <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password">
                    <Form.Control
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="rounded-pill ps-4"
                      type="password"
                      placeholder="Password"
                      minLength="5"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>

                <Button variant="success" className="btn-green fw-bold rounded-pill p-3 w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </div>
          </Col>

          {/* THIRD PARTY SIGN UP  */}
          <Col xs={12}>
            <div className="d-flex justify-content-center align-items-center my-2 py-1 h-100">
              <p>--OR--</p>
            </div>
          </Col>
          <Col xs={12}>
            <h2 className="title text-center fw-bold">Sign Up With</h2>
            <div className="d-flex justify-content-around align-items-center h-100 pb-3">
              <button onClick={signInWithGoogle} className="btn btn-danger">
                Google
              </button>
            </div>
          </Col>
        </Row>

        <h6 className="my-3 pt-2 text-center">
          Already have account?{" "}
          <NavLink className="text-cursive" to={{ pathname: "/login", state: { from: refferer } }}>
            Log In
          </NavLink>{" "}
          instead.
        </h6>
      </Container>
    </div>
  );
};

export default Signup;
