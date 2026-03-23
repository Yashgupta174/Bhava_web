import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const betaStyle = {
  position: "fixed",
  top: "28px",
  left: "20px",
  zIndex: 9999,
  background: "#EDEADE",
  border: "1.5px solid #1B3A2D",
  borderRadius: "10px",
  padding: "5px 14px",
  fontFamily: "Inter, 'Work Sans', sans-serif",
  fontSize: "12px",
  fontWeight: "700",
  color: "#1B3A2D",
  letterSpacing: "3px",
  lineHeight: "1",
  pointerEvents: "none",
};

function Layout() {
  return (
    <>
      <ScrollToTop />
      <div style={betaStyle}>BETA</div>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;