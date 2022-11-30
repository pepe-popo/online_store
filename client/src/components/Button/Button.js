import React from "react";
import './ButtonStyle.css'

const Button = ({ children, onClick}) => {
    return (
        <div onClick={() =>  onClick()}
            className="myButton">
            {children}
        </div>
    );
};

export default Button;