export default function Dates(
    {invoiceDate, invoiceNo, dueDate, catagory}
){
    return(
        <>
        <article className="mt-5 mb-10 flex items-start justify-start">
            <ul>
              <li className="p-1"><span className="font-bold">Report ID: </span>{invoiceNo}</li>
              <li className="p-1"><span className="font-bold">Report date: </span>{invoiceDate}</li>
              
            </ul>
        </article>
        </>
    )
}