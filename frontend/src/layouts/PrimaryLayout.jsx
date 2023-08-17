import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/navigation/Header/Header";
import Footer from "../components/navigation/Footer/Footer";

/**
 * @returns Layout principal, compuesto por el header, la información y un footer
 */
const PrimaryLayout = () => {
  return (
    <section className="primary-layout">
      <Header />
      <Outlet />
      <Footer />
    </section>
  );
};

export default PrimaryLayout;
