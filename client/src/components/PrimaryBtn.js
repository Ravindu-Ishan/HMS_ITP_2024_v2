import React, { useState } from "react";

function PrimaryBtn({ btntitle, onClick }) {
  return (
    <div>
      <button
        onClick={onClick}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {btntitle}
      </button>
    </div>
  );
}

export default PrimaryBtn;
