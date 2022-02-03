import React, { useState } from "react";
import { FormControl, InputGroup, Button } from "react-bootstrap";
import { useRouteMatch } from "react-router";
import useAuth from "../../../../hooks/useAuth";

const MakeAdmin = () => {
    const { user, userRole } = useAuth();
    const [email, setEmail] = useState("");
    const { path, url } = useRouteMatch();

    const handleAdminSubmit = (e) => {
        e.preventDefault();
        const update = {
            email: email,
            role: "admin",
        };
        fetch(`http://localhost:5000/users/role/${user?.uid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(update),
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    };

    return (
        <>
            <h5 className="text-muted mb-4 mt-0 p-0 fw-normal">{url}</h5>
            <div className="paper">
                <div className="paper-top">
                    <h3 className="border-bottom pb-3">
                        <i className="bi bi-person-check"></i> Make Admin
                    </h3>
                </div>
                <div className="paper-body table-responsive">
                    <form onSubmit={handleAdminSubmit}>
                        <InputGroup className="my-3 px-3">
                            <FormControl
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon2"
                            />
                            <Button
                                type="submit"
                                variant="success"
                                className="btn-green"
                                id="button-addon"
                                style={{height:"max-content"}}
                            >
                                Make Admin
                            </Button>
                        </InputGroup>
                    </form>
                </div>
            </div>
        </>
    );
};

export default MakeAdmin;
