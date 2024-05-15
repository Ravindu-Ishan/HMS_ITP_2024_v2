export default function Ward_ReportMainDetails(){
    // Get current date and time
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();

    return(
        <>
        <article className="mt-5 mb-10 flex items-end justify-start">
            <ul>
                <li className="p-1"><span className="font-bold">Report date: </span>{currentDate}</li>
                <li className="p-1"><span className="font-bold">Report time: </span>{currentTime}</li>
            </ul>
        </article>
       
        </>
    )
}