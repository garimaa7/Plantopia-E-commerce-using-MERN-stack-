import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import bg from "../../../../assets/monstera.jpg";
import { NavLink } from "react-router-dom";
import "./AboutSection.css";

const AboutSection = () => {
  return (
    <section>
      <Container>
        <Row className="py-5">
          <Col className="d-flex justify-content-start align-items-center" xs="12" md="5">
            <div className="about-left bg-gr p-3">
              <img src={bg} alt="" />
            </div>
          </Col>
          <Col xs="12" md="7">
            <div className="about-right text-start">
              <SectionTitle title="About Plantopia">
                Plantopia is an initiative taken by our shop to be able to reach a wider range of audience.
                We will make sure to provide excelllent services as well as products as mentioned in the description.
                You may ask us about any queries you have regarding the plants you have purchased through us using the live chat.``
                <br />
                <br />
                <NavLink to="/about">
                  <Button variant="warning" className="rounded-pill btn-cursive">
                    Learn More
                  </Button>
                </NavLink>
              </SectionTitle>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
