/*export default function ClientDetails(
    {clientName, clientAddress}
){
    return(
        <>
        <section className="mt-5">
            <h2 className="text-2xl uppercase font-bold mb-1">{clientName}</h2>
            <p className="uppercase">{clientAddress}</p>
        </section>
       
        </>
    )
}*/

export default function ClientDetails(
    {reportDate, reportNo, startTime, endTime}
){
    return(
        <>
        <section className="mt-5">
            <ul>
              <li className="p-1"><span className="font-bold">Report No: </span>{reportNo}</li>
              <li className="p-1 bg-gray-100"><span className="font-bold">Report date: </span>{reportDate}</li>
              <li className="p-1"><span className="font-bold">Started time of Checking: </span>{startTime}</li>
              <li className="p-1"><span className="font-bold">End Time of Checking:</span>{endTime}</li>
            </ul>
        </section>
        </>
    )
}