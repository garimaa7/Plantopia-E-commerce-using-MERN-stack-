import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Banner.css";
import bannerImg from "../../../../assets/succulents.jpg";

const Banner = () => {
    return (
        <div className="banner mb-5">
            <Container>
                <Row>
                    <Col xs="12" lg="6">
                        <div className="banner-left">
                            <h1 className="banner-title">
                            Home is <br /> where your <br /> Plants are<br /> 
                                <NavLink to="/explore">
                                    <Button variant="outline-warning rounded-pill">Shop Now</Button>
                                </NavLink>
                            </h1>
                        </div>
                    </Col>
                    <Col xs="12" lg="6">
                        <div className="banner-right">
                            <div className="bg-wrapper">
                                <img src={bannerImg} alt="" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Banner;
