import React, { useState } from "react";
import { Person, Email, Password  } from "@mui/icons-material";
import user_icon from '../../assets/user.png'
import lock from '../../assets/lock.png'
import email from '../../assets/envelope.png'
import './LoginBox.css'




const LoginBox: React.FC = () => {

    const [action, setAction] = useState("Sign Up");
    
    return(
        <div className="container">
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
        </div>
                <div className="inputs">
                    {action ==="Login"?<div></div>:
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="text" placeholder="Name"></input>
                    </div>}

                    <div className="input">
                        <img src={email} alt=""/>
                        <input type="email" placeholder="E-mail"></input>
                    </div>
                    <div className="input">
                        <img src={lock} alt=""/>
                        <input type="password" placeholder="Password"></input>
                    </div>
                </div>
                {action ==="Sign Up"?<div></div>:
                <div className="forgot-password">Forgot Password? <span>Click Here</span></div>
}
                <div className="submit-container">
                    <div className={action==="Login"?"submit gray":"submit"} onClick={() => {setAction("Sign Up")}}> Sign Up</div>
                    <div className={action==="Sign Up"?"submit gray":"submit"} onClick={() => {setAction("Login")}}> Login</div>
                </div>
            </div>
    )
}

export default LoginBox;