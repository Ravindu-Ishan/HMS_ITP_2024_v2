export default function Header({handlePrint}){
    return(
        <>
        <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
            <div>
              <h1 className="font-bold uppercase tracking-wide text-3xl mb-3">Patients</h1>
              <h1 className="font-bold uppercase tracking-wide text-2xl mb-3">Daily Report</h1>
            </div>
        </header>
        </>
    )
}