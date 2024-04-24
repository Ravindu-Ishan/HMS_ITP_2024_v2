export default function AppForm(
    {
        name,
        setName,
        address,
        setAddress,
        email,
        setEmail,
        phone, 
        setPhone,
        website, 
        setWebsite, 
        bankName, 
        setBankName,
        bankAcc, 
        setBankAcc,
        clientAddress,
        setClientAddress,
        clientName, 
        setClientName,
        dueDate, 
        setDueDate,
        invoiceDate, 
        setInvoiceDate,
        invoiceNo,
        setInvoiceNo,
        catagory,
        setCatagory
    }
){
    
      return(
          <>
          <h4 className="font-bold">Front Desk Officer Details:</h4>
          <article className="md:grid grid-cols-2 gap-10">
               
                <div className="flex flex-col">
                  <label htmlFor="name">Your full name</label>
                    <input 
                    type="text"
                    name="text"
                    id="name"
                    placeholder="Enter your name"
                    autoComplete="off"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>

                </div>
              
                <div className="flex flex-col">
                  <label htmlFor="address">Your Staff ID</label>
                    <input 
                    type="text"
                    name="text"
                    id="address"
                    placeholder="Enter your Staff ID"
                    autoComplete="off"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}/>

                </div>
                
              </article>
              
              <article className="md:grid grid-cols-3 gap-10 mb-10">
              
                <div className="flex flex-col">
                  <label htmlFor="email">Your Gender</label>
                    <input 
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Select your gender"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>

                </div>
              
                <div className="flex flex-col">
                  <label htmlFor="phone">Your Contact No.</label>
                    <input 
                    type="text"
                    name="text"
                    id="phone"
                    placeholder="Enter your Contact No."
                    autoComplete="off"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}/>

                </div>

              </article> 
              
              

              <h4 className="font-bold">Appointments Report Details:</h4>
              <article className="md:grid grid-cols-3 gap-10">

                <div className="flex flex-col">
                  <label htmlFor="category">Category</label>
                    <input 
                    type="text"
                    name="text"
                    id="category"
                    placeholder="Select Category"
                    autoComplete="off"
                    value={catagory}
                    onChange={(e) => setCatagory(e.target.value)}/>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="invoiceNo">Report ID</label>
                    <input 
                    type="text"
                    name="text"
                    id="invoiceNo"
                    placeholder="Enter Report ID"
                    autoComplete="off"
                    value={invoiceNo}
                    onChange={(e) => setInvoiceNo(e.target.value)}/>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="invoiceDate">Report Date</label>
                    <input 
                    type="date"
                    name="date"
                    id="invoiceDate"
                    placeholder="Enter Report Date"
                    autoComplete="off"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}/>
                </div>

              </article>
          
          </>
      )
  }