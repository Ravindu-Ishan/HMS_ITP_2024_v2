export default function MainDetails(
    {name, address, email, phone, bankName, catagory}
){
    return(
        <>
        <section className="flex flex-col">
            <h2 className="font-bold text-xl uppercase mb-1 md:text-3xl">{name}</h2>
            <p className="uppercase">{address}</p>
            <p>{email}</p>
            <p>{phone}</p>
            <p>{bankName}</p>
        </section>
       
        </>
    )
}