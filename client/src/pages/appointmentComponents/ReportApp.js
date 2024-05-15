import React, { useState,useRef } from "react";
//import ClientDetails from "./ClientDetails";
//import Dates from "./Dates";
//import Footer from "./Footer";
import Header from "./Header";
import MainDetails from "./MainDetails";
import Notes from "./Notes";
import Table from "./Table";
// import TableForm from "./TableForm";
import ReactToPrint from "react-to-print";
import AppForm from "./AppForm";
import TopNavAppointment from "../../components/TopNavAppointment";
//import images
import brandLogo from "../../images/brandLogo.png"



function ReportApp() {
  const[showInvoice, setShowInvoice] = useState(true)
  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[phone, setPhone] = useState("")
  const[bankName, setBankName] = useState("")
  const[bankAcc, setBankAcc] = useState("")
  const[address, setAddress] = useState("")
  const[website, setWebsite] = useState("")
  const[invoiceNo, setInvoiceNo] = useState("")
  const[invoiceDate, setInvoiceDate] = useState("")
  const[dueDate, setDueDate] = useState("")
  const[notes, setNotes] = useState("")
  const[catagory, setCatagory] = useState("")
  // const[description, setDescription] = useState("")
  // const[totApp, setTotApp] = useState("")
  // const[proceed, setproceed] = useState("")
  // const[amount, setAmount] = useState("")
  // const[pending, setPending] = useState("")
  
  // const[list, setList] = useState([])
  // const[total, setTotal] = useState(0)

  const componentRef = useRef()

  const handlePrint = () => {
    window.print()
  }


  return (
    <>
    <div className='navarea'>
      <TopNavAppointment/>
    </div>

    <main>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">
    
        {showInvoice ? ( 
          <>

          <ReactToPrint trigger={() => <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
            Print / Download</button>}

          content={() => componentRef.current}/>

          <div ref={componentRef} className="p-10">
          <div className="sidebar-brand inline-flex"><img src={brandLogo} alt="brand logo" width={60} className="mr-2" /><div className="mt-2 text-blue-900">MedFlow</div></div>
            <Header handlePrint={handlePrint}/>
            
            <MainDetails 
            name={name} 
            address={address} 
            email={email} 
            phone={phone}
            bankName={bankName}
            invoiceDate={invoiceDate}
            dueDate={dueDate}
            invoiceNo={invoiceNo}
            catagory={catagory}/>
            
            {/* <ClientDetails
            clientName={clientName}
            clientAddress={clientAddress}/> */}
          
            {/* <Dates
            invoiceDate={invoiceDate}
            dueDate={dueDate}
            invoiceNo={invoiceNo}
            catagory={catagory}/> */}
    
            <Table/>
          
            <Notes
            notes={notes}/>

            {/* <Footer 
            name={name} 
            email={email}
            bankName={bankName}
            website={website}
            phone={phone}
            bankAcc={bankAcc}/> */}

          </div>
            {/* <button onClick={() => setShowInvoice(false)}
            className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
              Edit Report Details</button> */}
          </>

           ) : (
            <>
            {/* name, address, email, phone, bank name, bank acc no., 
            website, client name, client adress, invoice no., 
            invoice date, due date, notes */}
            
            {/* md:mt-20 --> for the gap between 2 sections*/}

            <div className="flex flex-col justify-center">
              
                <AppForm 
                name={name}
                setName={setName}
                address={address}
                setAddress={setAddress}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                website={website}
                setWebsite={setWebsite}
                bankName={bankName}
                setBankName={setBankName}
                bankAcc={bankAcc}
                setBankAcc={setBankAcc}
                invoiceNo={invoiceNo}
                setInvoiceNo={setInvoiceNo}
                invoiceDate={invoiceDate}
                setInvoiceDate={setInvoiceDate}
                dueDate={dueDate}
                setDueDate={setDueDate}
                catagory={catagory}
                setCatagory={setCatagory}

                />

              {/* this is table form
              <article>

                <TableForm 
                description={description}
                setDescription={setDescription}

                totApp={totApp}
                setTotApp={setTotApp}

                proceed={proceed}
                setproceed={setproceed}

                amount={amount}
                setAmount={setAmount}

                list={list}
                setList={setList}

                total={total}
                setTotal={setTotal}

                pending={pending}
                setPending={setPending}
                />

              </article> */}
  
                <label htmlFor="notes">Additional Notes</label>
                  <textarea 
                  type="text"
                  name="text"
                  id="notes"
                  placeholder="Enter your notes here"
                  autoComplete="off"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}/>


              <button onClick={() => setShowInvoice (true)} 
              className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">Preview Report</button>
              
            </div>
            </>
          )}
      </main>
      </main>
    </>
  );
}

export default ReportApp;
