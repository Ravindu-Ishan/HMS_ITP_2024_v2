export default function ClientDetails(
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
}