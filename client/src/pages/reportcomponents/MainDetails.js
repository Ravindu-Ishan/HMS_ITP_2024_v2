export default function MainDetails(
    {doctorname, roomNo}
){
    return(
        <>
        <section className="flex flex-col items-end justify-end">
            {/*<h2 className="font-bold text-xl uppercase mb-1 md:text-4xl">{doctorname}</h2>
             <p>{roomNo}</p>*/}
            <ul>
                <li className="p-1 bg-gray-100"><span className="font-bold">Doctor Name: </span>{doctorname}</li>
                <li className="p-1"><span className="font-bold">Room No: </span>{roomNo}</li>
            </ul> 
        </section>
       
        </>
    )
}