import React, { useState, useRef } from "react";
import ClientDetails from "./ClientDetails";
//import Dates from "./Dates";
import Footer from "./Footer";
import Header from "./Header";
import MainDetails from "./MainDetails";
import Notes from "./Notes";
import Table from "./Table";
import TableForm from "./TableForm";
import ReportAppForm from "./ReportAppForm";
import ReactToPrint from "react-to-print";
//import NavBar from "../components/NavBar";


function ReportApp() {
  const [showInvoice, setShowInvoice] = useState(false)
  const [doctorname, setDoctorname] = useState("")
  const [roomNo, setRoomNo] = useState("")
  //const[phone, setPhone] = useState("")
  //const[bankName, setBankName] = useState("")
  //const[bankAcc, setBankAcc] = useState("")
  //const[address, setAddress] = useState("")
  //const[website, setWebsite] = useState("")
  //const[clientName, setClientName] = useState("")
  //const[clientAddress, setClientAddress] = useState("")
  const [reportNo, setReportNo] = useState("")
  const [reportDate, setReportDate] = useState("")
  const [startTime, setStartTime] = useState("")
  const [endTime, setEndTime] = useState("")
  const [notes, setNotes] = useState("")
  //const[reportdescription, setReportdescription] = useState("")
  const [noofappoinments, setNoofappoinments] = useState("")
  const [checkedpatients, setCheckedpatients] = useState("")
  const [minorpatients, setMinorpatients] = useState("")
  const [canceledappoinments, setCanceledappoinments] = useState("")
  const [hospitalizationpatients, setHospitalizationpatients] = useState("")
  const [list, setList] = useState([])
  //const[total, setTotal] = useState(0)

  const componentRef = useRef()

  const handlePrint = () => {
    window.print()
  }


  return (

    <>
      {/* <NavBar /> */}
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">

        {showInvoice ? (
          <>

            <ReactToPrint trigger={() => <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
              Print / Download</button>}

              content={() => componentRef.current} />

            <div ref={componentRef} className="p-7">
              <Header handlePrint={handlePrint} />

              <MainDetails
                doctorname={doctorname}
                roomNo={roomNo} />

              <ClientDetails
                reportDate={reportDate}
                startTime={startTime}
                endTime={endTime}
                reportNo={reportNo} />

              {/*<Dates
            invoiceDate={invoiceDate}
            dueDate={dueDate}
            invoiceNo={invoiceNo}/>*/}

              <Table
                //reportdescription={reportdescription}
                noofappoinments={noofappoinments}
                checkedpatients={checkedpatients}
                minorpatients={minorpatients}
                canceledappoinments={canceledappoinments}
                hospitalizationpatients={hospitalizationpatients}
                list={list}
              //total={total}
              //setTotal={setTotal}
              />

              <Notes
                notes={notes} />

              <Footer
                doctorname={doctorname}
                roomNo={roomNo}
                reportNo={reportNo}
                reportDate={reportDate}
                startTime={startTime}
                endTime={endTime} />

            </div>
            <button onClick={() => setShowInvoice(false)}
              className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
              Edit Report Details</button>
          </>

        ) : (
          <>
            {/* name, address, email, phone, bank name, bank acc no., 
            website, client name, client adress, invoice no., 
            invoice date, due date, notes */}

            {/* md:mt-20 --> for the gap between 2 sections*/}

            <div className="flex flex-col justify-center">


              <ReportAppForm
                doctorname={doctorname}
                setDoctorname={setDoctorname}

                roomNo={roomNo}
                setRoomNo={setRoomNo}

                //email={email}
                //setEmail={setEmail}

                //phone={phone}
                //setPhone={setPhone}

                //website={website}
                //setWebsite={setWebsite}

                //bankName={bankName}
                //setBankName={setBankName}

                //bankAcc={bankAcc}
                //setBankAcc={setBankAcc}

                //clientName={clientName}
                //setClientName={setClientName}

                //clientAddress={clientAddress}
                //setClientAddress={setClientAddress}

                reportNo={reportNo}
                setReportNo={setReportNo}

                reportDate={reportDate}
                setReportDate={setReportDate}

                startTime={startTime}
                setStartTime={setStartTime}

                endTime={endTime}
                setEndTime={setEndTime}


              />

              {/* this is table form */}
              <article>

                <TableForm
                  //reportdescription={reportdescription}
                  //setReportdescription={setReportdescription}

                  noofappoinments={noofappoinments}
                  setNoofappoinments={setNoofappoinments}

                  checkedpatients={checkedpatients}
                  setCheckedpatients={setCheckedpatients}

                  minorpatients={minorpatients}
                  setMinorpatients={setMinorpatients}

                  canceledappoinments={canceledappoinments}
                  setCanceledappoinments={setCanceledappoinments}

                  hospitalizationpatients={hospitalizationpatients}
                  setHospitalizationpatients={setHospitalizationpatients}

                  list={list}
                  setList={setList}

                //total={total}
                //setTotal={setTotal}
                />

              </article>

              <label htmlFor="notes">Additional Notes</label>
              <textarea
                type="text"
                name="text"
                id="notes"
                placeholder="Enter your notes here"
                autoComplete="off"
                value={notes}
                onChange={(e) => setNotes(e.target.value)} />


              <button onClick={() => setShowInvoice(true)}
                className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Preview Invoice</button>

            </div>
          </>
        )}
      </main>
    </>
  );
}

export default ReportApp;
