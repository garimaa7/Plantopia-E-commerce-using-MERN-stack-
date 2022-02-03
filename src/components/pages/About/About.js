import React, { useEffect, useState } from "react";
import { Container, Row, Carousel, CarouselItem } from "react-bootstrap";
import Navigation from "../Shared/Navigation/Navigation";
import car1 from "../../../assets/Planters.jpg";
import car2 from "../../../assets/orchids.jpg";
import car3 from "../../../assets/car3.jpg";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import "./About.css";

function About() {

 
    // const { isLoading } = useAuth();
    return (
        <>
        <div>
            <Navigation></Navigation>

            <Carousel >
                <Carousel.Item style ={{height:"700px"}}>
                    <img
                    className="d-block w-100 "
                    src={car1}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3></h3>
                    <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style ={{height:"700px"}}>
                    <img
                    className="d-block w-100 "
                    src={car2}
                    alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3></h3>
                    <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item style ={{height:"700px"}}>
                    <img
                    className="d-block w-100 "
                    src={car3}
                    alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3></h3>
                    <p></p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
     
        </div>

        <div className="about-right text-start" id="about">
              <SectionTitle title="About Plantopia"/>
                <p>Plantopia is an initiative taken by our shop to be able to reach a wider range of audience.
                We will make sure to provide excelllent services as well as products as mentioned in the description.
                You may ask us about any queries you have regarding the plants you have purchased through us using the live chat.
                At Plantopia, we want to help bring the joy of gardening to anyone and everyone. 
                To do that, we bring our customers fresh, personalised ideas, we source the best plants and products from the best suppliers, 
                then we deliver them to their new home, along with all the tips an urban gardener could possibly need to look after their new garden.


                </p>
                
        </div>

        </>

        
    )
}

export default About
