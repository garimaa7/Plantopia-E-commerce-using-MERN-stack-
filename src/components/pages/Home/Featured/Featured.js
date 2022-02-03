import React, { useEffect, useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import "./Featured.css";

const Featured = () => {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/products?limit=6")
            .then((res) => res.json())
            .then((data) => setFeatured(data));
    }, []);

    return (
        <div className="featured pb-5">
            <SectionTitle title="Better Plants At Lower Prices!">
             Our team at Plantopia offers you the best plants at the best rates.
                We offer a wide range of plants each with detailed description to help you choose easily.
            </SectionTitle>

            <div className="products">
                <Container>
                    <Row>
                        {featured.map((product, index) => (
                            <ProductCard key={index} product={product}></ProductCard>
                        ))}
                    </Row>
                </Container>
            </div>

            <NavLink to="/explore">
                <Button className="rounded-pill btn-cursive" variant="outline-success">
                    Explore More Plant
                </Button>
            </NavLink>
        </div>
    );
};

export default Featured;
