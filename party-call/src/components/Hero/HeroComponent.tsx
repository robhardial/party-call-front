import React from "react";
import newParty from "../../assets/newParty.png";
import { createTheme, ThemeProvider, Button } from "@mui/material";
import "./HeroComponent.css";
import { Link, useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#015482",
    },
  },
});

const HeroComponent: React.FC = () => {
  const nav = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <section className="custom-hero">
        <div className="background-image">
          <div className="hero-container">
            <div className="hero-text">
              <div className="hero-first-text">
                <span className="main-first-text">Making memories</span>
                <span className="main-second-text">One at a time </span>
              </div>
                <div className="hero-button" onClick={() => nav("/find-events")}>
                  Find Events
                </div>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default HeroComponent;
