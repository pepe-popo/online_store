import React from "react";
import Modal from "../Modal";
import './EditType.css';

const EditType = ({active, setActive})=> {
    
    return <Modal active={active} setActive={setActive}>
        <div style={{background: "yellow", width: "500px", height: "500px"}}>
            
        </div>
    </Modal>
}

export default EditType;