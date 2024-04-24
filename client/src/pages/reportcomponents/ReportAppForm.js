export default function ReportAppForm({
    doctorname,
    setDoctorname,
    roomNo,
    setRoomNo,
    //address,
    //setAddress,
    //email,
    //setEmail,
    //phone,
    //setPhone,
    //website,
    //setWebsite,
    //bankName,
    //setBankName,
    //bankAcc,
    //setBankAcc,
    //clientName,
    //setClientName,
    //clientAddress,
    //setClientAddress,
    reportNo,
    setReportNo,
    reportDate,
    setReportDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime
})

{
  const handleDoctorNameChange = (e) => {
    const value = e.target.value;
    // Allow only letters for Doctor Name
    if (/^[a-zA-Z\s]*$/.test(value) || value === "") {
        setDoctorname(value);
    }
};

  const handleRoomNoChange = (e) => {
    const value = e.target.value;
    // Allow only numbers for Room No
    if (/^\d*$/.test(value) || value === "") {
        setRoomNo(value);
    }
};

const handleReportNoChange = (e) => {
    const value = e.target.value;
    // Allow only numbers for Report No
    if (/^\d*$/.test(value) || value === "") {
        setReportNo(value);
    }
};


  return(
      
    <>


    <article className="md:grid grid-cols-2 gap-10">
                
    <div className="flex flex-col">
      <label htmlFor="doctorname">Doctor Name</label>
        <input 
        type="text"
        name="text"
        id="text"
        placeholder="Enter doctor name"
        maxLength={50}
        autoComplete="off"
        value={doctorname}
        onChange={handleDoctorNameChange}/>

    </div>
  
    <div className="flex flex-col">
      <label htmlFor="roomNo">Room No</label>
        <input 
        type="text"
        name="text"
        id="roomNo"
        placeholder="Enter doctor room number"
        maxLength={4}
        autoComplete="off"
        value={roomNo}
        onChange={handleRoomNoChange}/>

    </div>
    
  </article>
  
  {/*<article className="md:grid grid-cols-3 gap-10">
  
    <div className="flex flex-col">
      <label htmlFor="email">Your Email</label>
        <input 
        type="email"
        name="email"
        id="email"
        placeholder="Enter your Email"
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>

    </div>
  
    <div className="flex flex-col">
      <label htmlFor="phone">Your Phone No.</label>
        <input 
        type="text"
        name="text"
        id="phone"
        placeholder="Enter your phone number"
        autoComplete="off"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}/>

    </div>

    <div className="flex flex-col">
      <label htmlFor="website">Your Website</label>
        <input 
        type="url"
        name="website"
        id="website"
        placeholder="Enter your website"
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}/>
    </div>
    
  
  </article> 
  
  <article className="md:grid grid-cols-2 gap-10">

    <div className="flex flex-col">
      <label htmlFor="bank">Your Bank Name</label>
        <input 
        type="text"
        name="text"
        id="bankName"
        placeholder="Enter your Bank"
        autoComplete="off"
        value={bankName}
        onChange={(e) => setBankName(e.target.value)}/>

    </div>


    <div className="flex flex-col">
      <label htmlFor="bankAcc">Your Bank Account Number</label>
        <input 
        type="text"
        name="text"
        id="bankAcc"
        placeholder="Enter your Bank Account No."
        autoComplete="off"
        value={bankAcc}
        onChange={(e) => setBankAcc(e.target.value)}/>

    </div>
    
  </article>*/}
    
  <article className="md:grid grid-cols-2 gap-10 md:mt-20">

    <div className="flex flex-col">
      <label htmlFor="reportNo">Report No</label>
        <input 
        type="text"
        name="text"
        id="reportNo"
        placeholder="Enter report no"
        maxLength={4}
        autoComplete="off"
        value={reportNo}
        onChange={handleReportNoChange}/>
    </div>
      
    <div className="flex flex-col">
      <label htmlFor="reportDate">Report Date</label>
        <input 
        type="date"
        name="date"
        id="reportDate"
        placeholder="Enter your Report Date"
        autoComplete="off"
        value={reportDate}
        onChange={(e) => setReportDate(e.target.value)}/>
    </div>

    <div className="flex flex-col">
      <label htmlFor="startTime"> Started time of checking</label>
        <input 
        type="time"
        name="time"
        id="startTime"
        placeholder="Enter checking started time"
        autoComplete="off"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}/>
    </div>

    <div className="flex flex-col">
      <label htmlFor="endTime">End Time of checking</label>
        <input 
        type="time"
        name="time"
        id="endTime"
        placeholder="Enter checking end time"
        autoComplete="off"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}/>
    </div>

  </article>
  
  {/*<article className="md:grid grid-cols-3 gap-10">

    <div className="flex flex-col">
      <label htmlFor="invoiceNo">Invoice Number</label>
        <input 
        type="text"
        name="text"
        id="invoiceNo"
        placeholder="Enter Invoice Number"
        autoComplete="off"
        value={invoiceNo}
        onChange={(e) => setInvoiceNo(e.target.value)}/>
    </div>

    <div className="flex flex-col">
      <label htmlFor="invoiceDate">Invoice Date</label>
        <input 
        type="date"
        name="date"
        id="invoiceDate"
        placeholder="Enter Invoice Date"
        autoComplete="off"
        value={invoiceDate}
        onChange={(e) => setInvoiceDate(e.target.value)}/>
    </div>


    <div className="flex flex-col">
      <label htmlFor="dueDate"> Due Date</label>
        <input 
        type="date"
        name="date"
        id="dueDate"
        placeholder="Enter Due Date"
        autoComplete="off"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}/>
    </div>

</article>*/}

  </>
)}