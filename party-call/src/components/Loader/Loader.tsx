import React from "react";
import { CircularProgress } from "@mui/material";
import "./Loader.css"

const Loader: React.FC = () => {
    return (
      <div className="loader-box">
        <CircularProgress size={80} thickness={5} />
        <p className="loader-text">Loading, please wait...</p>
      </div>
    );
};

export default Loader;
