import React, { useState, useRef } from "react";
import Ward_ReportHeader from "./Ward_ReportHeader";
import Ward_ReportMainDetails from "./Ward_ReportMainDetails";
import Ward_ReportTable from "./Ward_ReportTable";
import ReactToPrint from "react-to-print";
import TopNavWard from "../../components/TopNavWards";
import brandLogo from "../../images/brandLogo.png"

function Ward_ReportApp() {
    const [showInvoice] = useState(true)
    const componentRef = useRef()
    const handlePrint = () => {
        window.print()
    }

    return (
        <>
            <div className='navarea'>
                <TopNavWard />
            </div>

            <main>
                <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow">

                    {showInvoice ? (
                        <>

                            <ReactToPrint trigger={() => <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                                Print / Download</button>}

                                content={() => componentRef.current} />

                            <div ref={componentRef} className="p-10">
                            <div className="sidebar-brand inline-flex"><img src={brandLogo} alt="brand logo" width={60} className="mr-2" /><div className="mt-2">MedFlow</div></div>
                                <Ward_ReportHeader handlePrint={handlePrint} />
                                <Ward_ReportMainDetails />
                                <Ward_ReportTable />
                            </div>
                        </>

                    ) : (
                        <>
                            <div className="flex flex-col justify-center">
                                <label htmlFor="notes">Additional Notes</label>
                            </div>
                        </>
                    )}
                </main>
            </main>
        </>
    );
}

export default Ward_ReportApp;
