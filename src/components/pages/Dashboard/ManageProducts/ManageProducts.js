import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const ManageProducts = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/products`)
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                console.log(data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteProduct = (id) => {
        const shouldDelete = window.confirm("Do you really want to Delete this Product?");
        if (!shouldDelete) return;
        fetch(`http://localhost:5000/products/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.deletedCount === 1) {
                    setProducts(products.filter((product) => product._id !== id));
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
                        <i className="bi bi-pencil-square"></i> Manage Products
                    </h3>
                    <div className="paper-body table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Product ID</th>
                                    <th scope="col">Unit Price</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product?._id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            {" "}
                                            <span>
                                                <img
                                                    className="order-img"
                                                    src={product?.img}
                                                    alt=""
                                                />
                                            </span>
                                            {product?.title}
                                        </td>
                                        <td>{product?._id}</td>
                                        <td>{product?.price}</td>
                                        <td>
                                            <i
                                                onClick={() => deleteProduct(product?._id)}
                                                className="bi bi-trash-fill fs-5 p-1 px-2 rounded shadow text-danger"
                                                title="Delete"
                                            ></i>{" "}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ManageProducts;
