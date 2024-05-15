import React, { useState, useRef } from "react";
import LabHeader from "./LabHeader";
import LabReportDetails from "./LabReportDetails";
import LabTable from "./LabTable";
import TopNavLabo from "../../components/TopNavLabo";

function GenerateReport() {
  const [showInvoice, setShowInvoice] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankAcc, setBankAcc] = useState("");
  const [address, setAddress] = useState("");
  const [website, setWebsite] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [catagory, setCatagory] = useState("");
  
  const componentRef = useRef();

  return (
    <>
      <div className='navarea'>
        <TopNavLabo />
      </div>
      <main>
        <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
          {showInvoice ? (
            <>
              <div ref={componentRef} className="p-10">
                <LabHeader componentRef={componentRef} />
                <LabReportDetails 
                  name={name}
                  address={address}
                  email={email}
                  phone={phone}
                  bankName={bankName}
                  invoiceDate={invoiceDate}
                  dueDate={dueDate}
                  invoiceNo={invoiceNo}
                  catagory={catagory}
                />
                <LabTable />
              </div>
              <button onClick={() => setShowInvoice(false)} className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Edit Report Details
              </button>
              
            </>
          ) : (
            <div className="flex flex-col justify-center">
              <label htmlFor="notes">Additional Notes</label>
              <textarea
                type="text"
                name="text"
                id="notes"
                placeholder="Enter your notes here"
                autoComplete="off"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <button onClick={() => setShowInvoice(true)} className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Preview Report
              </button>
            </div>
          )}
        </main>
      </main>
    </>
  );
}

export default GenerateReport;
