import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

//main function
function EditDataModel({ btntitle, modaltitle, modalContent, buttonFunction }) {
    //states
    const [open, setOpen] = useState(false);

    //sub functions
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const handleonClick = () => {
        onOpenModal();
        buttonFunction();
    }

    return (
        <div>
            <button
                onClick={handleonClick}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
                {btntitle}
            </button>

            <Modal
                open={open}
                onClose={onCloseModal}
                classNames={{
                    overlay: "customOverlay",
                    modal: "customModal",
                }}
                closeOnOverlayClick={false}
                center={true}
                aria-labelledby="my-modal-title"
                aria-describedby="my-modal-description"
            >
                <h2 id="my-modal-title">{modaltitle}</h2>
                {modalContent}
            </Modal>
        </div>
    );
}

export default EditDataModel;
