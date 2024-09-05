import React from "react";
import { Person, Email, Password  } from "@mui/icons-material";
import user_icon from '../../assets/user.png'
import lock from '../../assets/lock.png'
import email from '../../assets/envelope.png'
import './LoginBox.css'




const LoginBox: React.FC = () => {
    return(
        <div className="container">
            <div className="header">
                <div className="text">Sign Up</div>
                <div className="underline"></div>
        </div>
                <div className="inputs">
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="text"></input>
                    </div>
                    <div className="input">
                        <img src={email} alt=""/>
                        <input type="email"></input>
                    </div>
                    <div className="input">
                        <img src={lock} alt=""/>
                        <input type="password"></input>
                    </div>
                </div>
                <div className="forgot-password">Forgot Password? <span>Click Here</span></div>
                <div className="submit-container">
                    <div className="submit"> Sign Up</div>
                    <div className="submit"> Login</div>
                </div>
            </div>
    )
}

export default LoginBox;