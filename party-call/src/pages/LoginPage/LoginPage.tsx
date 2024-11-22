import React from "react";
import LoginBox from "../../components/Login/LoginBox";
import "../LoginPage/LoginPage.css";

const LoginPage: React.FC = () => {
  return (
    <div className="background-img">
      <div className="login-box">
        <LoginBox />
      </div>
    </div>
  );
};

export default LoginPage;
