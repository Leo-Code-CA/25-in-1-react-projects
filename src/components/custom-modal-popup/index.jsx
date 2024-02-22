export default function Modal({ id, heading, body, footer, onClose }) {

    return (
        <div id={id || "Modal"} className="modal">
            <div className="modal-content">
                <div className="modal-heading">
                    <span className="close-modal"
                    onClick={onClose}>
                        &times;
                    </span>
                    <h2>
                        {
                            heading ? heading : "Heading"
                        }
                    </h2>
                </div>
                <div className="modal-body">
                    {
                        body ? body : <p>This is our modal's body</p>
                    }
                </div>
                <div className="modal-footer">
                    {
                        footer ? footer : <p>This is our footer</p>
                    }
                </div>
            </div>
        </div>
    );
}