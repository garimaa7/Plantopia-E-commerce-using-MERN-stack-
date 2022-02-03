import React from "react";
import { Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { _id, title, price, desc, img, care, type } = product;

  return (
    <Col className="card" xs="12" md="6" lg="4">
      <img src={img} alt="" />
      <div className="product-detail">
        <div className="product-title">
          <h4>{title}</h4>
        </div>
        <div className="product-desc">{desc}</div>
        <div className="product-desc">Care: {care}</div>
        <div className="product-desc">Type: {type}</div>
        <div className="d-flex justify-content-between align-items-end ">
          <h1 className="mb-0">Rs {price}</h1>
          <NavLink to={`/Purchase/${_id}`}>
            <Button variant="outline-warning" className="rounded-pill btn-cursive">
              View
            </Button>
          </NavLink>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
