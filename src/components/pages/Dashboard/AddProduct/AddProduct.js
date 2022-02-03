import React, { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { useRouteMatch } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const AddProduct = () => {
    const { user, userRole } = useAuth();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState("");
    const [care, setCare] = useState("");
    const [light, setLight] = useState("");
    const [water, setWater] = useState("");
    const [price, setPrice] = useState(0);
    const [img, setImg] = useState("");

    const { path, url } = useRouteMatch();

    const handleProductSubmit = (e) => {
        e.preventDefault();
        const product = {
            title,
            desc,
            type,
            care,
            light,
            water,
            price,
            img,
        };
        fetch(`http://localhost:5000/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
        })
            .then((res) => res.json())
            .then((data) => {
                setTitle("");
                setDesc("");
                setType("");
                setCare("");
                setLight("");
                setWater("");
                setPrice(0);
                setImg("");
                console.log(data);
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <h5 className="text-muted mb-4 mt-0 p-0 fw-normal">{url}</h5>
            <div className="paper">
                <div className="paper-top">
                    <h3 className="border-bottom pb-3">
                        <i className="bi bi-pencil-square"></i>
                        Add Product
                    </h3>
                </div>
                <div className="paper-body table-responsive">
                    <form onSubmit={handleProductSubmit}>
                        <InputGroup className="my-3 px-3">
                            <FormControl
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Product Title"
                                aria-label="Product Title"
                                type="text"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 px-3">
                            <FormControl
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Description"
                                aria-label="Description"
                                type="text"
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3 px-3">
                            <FormControl
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                placeholder="Type"
                                aria-label="Type"
                                type="text"
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3 px-3">
                            <FormControl
                                value={care}
                                onChange={(e) => setCare(e.target.value)}
                                placeholder="Care"
                                aria-label="Care"
                                type="text"
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3 px-3">
                            <FormControl
                                value={light}
                                onChange={(e) => setLight(e.target.value)}
                                placeholder="Light"
                                aria-label="Light"
                                type="text"
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3 px-3">
                            <FormControl
                                value={water}
                                onChange={(e) => setWater(e.target.value)}
                                placeholder="Water"
                                aria-label="Water"
                                type="text"
                                required
                            />
                        </InputGroup>

                        <InputGroup className="mb-3 px-3">
                            <FormControl
                                value={img}
                                onChange={(e) => setImg(e.target.value)}
                                placeholder="Image URL"
                                aria-label="Image URL"
                                type="text"
                                required
                            />
                        </InputGroup>
                        <InputGroup className="mb-3 px-3">
                            <FormControl
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                                aria-label="Price"
                                type="number"
                                required
                            />
                        </InputGroup>

                        <Button type="submit" variant="success" className="btn-green">
                            Submit
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
