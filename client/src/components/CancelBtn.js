import React from "react";

function CancelBtn({ btntitle, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {btntitle}
      </button>
    </div>
  );
}

export default CancelBtn;
