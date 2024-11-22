import React from "react";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/Header/HeaderComponent";
import Footer from "../components/Footer/FooterComponent";
import "./Layout.css";

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <HeaderComponent className="header" />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
