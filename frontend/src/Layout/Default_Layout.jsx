import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Banner from "../components/Banner";

const Default_Layout = () => {
  return (
    <>
      {/* <Header /> */}
      <main id="main-layout">
   
   
          <Outlet />
      
      </main>
      <Footer />
    </>
  );
};

export default Default_Layout;
