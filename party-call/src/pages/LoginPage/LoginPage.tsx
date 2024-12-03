import React from "react";
import LoginBox from "../../components/Login/LoginBox";
import "../LoginPage/LoginPage.css";
import cheers from "../../assets/cheers.jpg"

const LoginPage: React.FC = () => {
  return (
    <div className="background-img">
      <div className="new-logon-box">
        <LoginBox />
      </div>
    </div>
  );
};

export default LoginPage;
