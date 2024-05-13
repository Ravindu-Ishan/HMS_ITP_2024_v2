export default function Footer(
    {doctorname, roomNo, reportNo, reportDate, startTime, endTime}
  ){
      return(
          <>
          
          <footer className="footer border-t-2 border-gray-300 pt-5">
              <ul className="flex flex-wrap items-center justify-center">
                <li><span className="font-bold">Doctor Name:</span> {doctorname}</li>
                <li><span className="font-bold">Room No:</span> {roomNo}</li>
                <li><span className="font-bold">Report No:</span>{reportNo}</li>
                <li><span className="font-bold">Report date:</span> {reportDate}</li>
                <li><span className="font-bold">Started time of Checking:</span>{startTime} </li>
                <li><span className="font-bold">End Time of Checking:</span>{endTime}</li>
                {/*<li><span className="font-bold">Website:</span>
                <a href={website} target="_blank" rel="noopenner noreferrer">{website}</a></li>*/}
              </ul>
            </footer>
  
           
          </>
      )
  }