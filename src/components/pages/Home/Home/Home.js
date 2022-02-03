import React from "react";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../Shared/Loading/Loading";
import Navigation from "../../Shared/Navigation/Navigation";
import AboutSection from "../AboutSection/AboutSection";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";


const Home = () => {
  const { isLoading } = useAuth();
  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <header>
        <Navigation></Navigation>
        <Banner></Banner>
      </header>
      <main>
        <AboutSection></AboutSection>
        <Featured></Featured>
      </main>
    </div>
  );
};

export default Home;
