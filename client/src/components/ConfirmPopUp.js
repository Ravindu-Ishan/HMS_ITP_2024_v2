import React, { useState } from "react";
import { Modal } from "react-responsive-modal";

//main function
function ConfirmPopUp({ btntitle, onConfirmFunction }) {

  ///states
  const [open, setOpen] = useState(false);

  //sub functions
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);


  const handleConfirm = () => {

    onCloseModal();
    onConfirmFunction();
  }

  const handleCancel = () => {

    onCloseModal();
  };

  return (
    <div>

      <button
        onClick={onOpenModal}
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
        <div className="p-4 md:p-5 text-center">
          <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h3 className="mb-5 text-lg font-normal text-gray-700">Are you sure you want to commit changes ?</h3>

          <div className=" inline-flex">
            <div className="mr-2">
              <button type="button" onClick={handleConfirm} className="py-2.5 px-5 text-sm font-medium rounded-3xl text-white focus:outline-none bg-blue-700  hover:bg-blue-800">
                Yes, Confirm
              </button>
            </div>
            <div>
              <button type="button" onClick={handleCancel} className=" py-2.5 px-5 text-sm font-medium rounded-3xl text-white bg-red-600 hover:bg-red-800   ">
                No, Cancel
              </button>
            </div>
          </div>

        </div>
      </Modal>
    </div>
  );
}

export default ConfirmPopUp;
