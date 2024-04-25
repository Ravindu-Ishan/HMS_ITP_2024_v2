export default function Dates(
    {invoiceDate, invoiceNo, dueDate, catagory}
){
    return(
        <>
        <article className="mt-10 mb-14 flex items-end justify-end">
            <ul>
                <li className="p-1"><span className="font-bold">Category: </span>{catagory}</li>
              <li className="p-1"><span className="font-bold">Invoice No: </span>{invoiceNo}</li>
              <li className="p-1 bg-gray-100"><span className="font-bold">Invoice date: </span>{invoiceDate}</li>
              
            </ul>
        </article>
        </>
    )
}