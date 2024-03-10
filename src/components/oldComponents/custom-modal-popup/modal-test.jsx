import { useState } from "react";
import Modal from "./index.jsx";
import './style.css';

export default function ModalTest() {

    const [showModalPopup, setShowModalPopup] = useState(false);

    function handleToggleModalPopup() {
        setShowModalPopup(!showModalPopup);
    }

    function handleClose() {
        setShowModalPopup(false);
    }

    return (
        <div>
            <button
            onClick={handleToggleModalPopup}
            >Open Modal Popup</button>
            {
                showModalPopup && 
                <Modal
                onClose={handleClose} 
                body={<div>Customized body content</div>}
                heading="Customized heading"
                footer={<b>Customized footer</b>}
                id="customID"/>
            }
        </div>
    );
}