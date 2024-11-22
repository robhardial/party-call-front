import React from "react";
import newParty from "../../assets/newParty.png";
import { createTheme, ThemeProvider, Button } from "@mui/material";
import "./HeroComponent.css";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#015482",
    },
  },
});

const HeroComponent: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <section className="custom-hero">
        <div className="background-image">
          <div className="hero-container">
            <div className="hero-text">
              <h1 className="hero-first-text">Let's Make A Party Call</h1>
              <Link to={"find-events"} className="link-reset">
                <Button size="large" variant="contained" color="primary">
                  Find Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default HeroComponent;
