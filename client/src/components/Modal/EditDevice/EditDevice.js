import React from "react";
import Modal from "../Modal";
import './EditDevice.css';

const EditDevice = ({active, setActive})=> {
    
    return <Modal active={active} setActive={setActive}>
        <div style={{background: "red", width: "500px", height: "500px"}}>
            
        </div>
    </Modal>
}

export default EditDevice;