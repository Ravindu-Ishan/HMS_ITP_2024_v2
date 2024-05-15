import React from 'react';
import ReactToPrint from 'react-to-print';

const LabHeader = ({ handlePrint, componentRef }) => (
  <header className="relative text-center my-4">
    <h1 className="font-bold text-xl">Laboratory Report</h1>
    <div className="absolute bottom-0 right-0 mb-4 mr-4">
      <ReactToPrint
        trigger={() => (
          <button className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
            Download
          </button>
        )}
        content={() => componentRef.current}
      />
    </div>
  </header>
);

export default LabHeader;
