import React, { useEffect, useState } from "react";
import { Container, Row, Button } from "react-bootstrap";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import Navigation from "../../Shared/Navigation/Navigation";
import ProductCard from "../../Shared/ProductCard/ProductCard";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import SearchBar from "./SearchBar";
// import "./SearchBar.css";
import "./Explore.css";

const Explore = () => {
    const { isLoading } = useAuth();
    const [featured, setFeatured] = useState([]);

    // For search
    const [searchText, setSearchText] = useState("");
    const onSearchTextChange = (e) => {
        setSearchText(e.target.value);
    };

    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then((res) => res.json())
            .then((data) => setFeatured(data));
    }, []);

    let exploreContent;
    if (isLoading) {
        exploreContent = <Loading></Loading>;
    } else if (searchText === "") {
        exploreContent = (
            <>
                <Navigation></Navigation>
                <div className="explore py-5">
                    <SectionTitle title="Better Plants At Lower Prices!">
                    Our team at Plantopia offers you the best plants at the best rates.
                    We offer a wide range of plants each with detailed description to help you choose easily.
                    </SectionTitle>

                    <div className="search">
                    <SearchBar searchText={searchText} onSearchTextChange={onSearchTextChange}>
                    </SearchBar>
                    <i className="bi bi-search"></i>
                    
                    </div>

                    <div className="products">
                        <Container>
                            <Row>
                                {featured.map((product, index) => (
                                    <ProductCard key={index} product={product}></ProductCard>
                                ))}
                            </Row>
                        </Container>
                    </div>
                </div>
            </>
        );
    } else {
        console.log(featured);
        const matchedFeatured = featured.filter((el) =>
            el.title.toLowerCase().includes(searchText.toLowerCase())
        );
        console.log(matchedFeatured);
        exploreContent = (
            <>
                <Navigation></Navigation>
                <div className="explore py-5">
                    <SectionTitle title="Better Plants At Lower Prices!">
                    Our team at Plantopia offers you the best plants at the best rates. 
                    We offer a wide range of plants each with detailed description to help you choose easily.
                    </SectionTitle>

                    <SearchBar searchText={searchText} onSearchTextChange={onSearchTextChange} />
                    <i className="fa fa-search"></i>

                    <div className="products">
                        <Container>
                            <Row>
                                {matchedFeatured.map((product, index) => (
                                    <ProductCard key={index} product={product}></ProductCard>
                                ))}
                            </Row>
                        </Container>
                    </div>
                </div>
            </>
        );
    }

    // if (isLoading) {
    //     return <Loading></Loading>;
    // }
    return (
        <>
            {exploreContent}
        </>
    );
};

export default Explore;
