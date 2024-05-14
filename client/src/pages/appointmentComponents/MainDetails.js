export default function MainDetails(
    {name, address, email, phone, bankName, catagory, invoiceDate,invoiceNo}
){
    return(
        <>
        <article className="mt-5 mb-10 flex items-end justify-start">
            <ul>
                <li className="p-1"><span className="font-bold">Front Desk Officer: </span>{name}</li>
                <li className="p-1"><span className="font-bold">Report ID: </span>{invoiceNo}</li>
                <li className="p-1"><span className="font-bold">Report date: </span>{invoiceDate}</li>
            </ul>
        </article>
       
        </>
    )
}