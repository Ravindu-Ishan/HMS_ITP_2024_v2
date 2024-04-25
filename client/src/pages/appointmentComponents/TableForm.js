import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TableForm({
  description,
  setDescription,
  totApp,
  setTotApp,
  proceed,
  setproceed,
  amount,
  setAmount,
  list,
  setList,
  total,
  setTotal,
  pending,
  setPending
}) {

    const  [isEditing, setIsEditing] = useState(false)

    // Submit form function
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description || !totApp || !proceed ) {
          alert("Please fill in all inputs")

        } 
        
        if(
          !(totApp > proceed) ||
          !(totApp > pending) 
        )

        {
          alert("Please Enter valid inputs")
          return;
        }

        else {
          const newItems = {
            id: uuidv4(),
            description,
            totApp,
            proceed,
            amount,
            pending
            };

            setList([...list, newItems]);
            setDescription("");
            setTotApp("");
            setproceed("");
            setAmount("");
            setPending("");
            setIsEditing(false)
        }


  };

  // Calculate items amount function
  useEffect(() => {
    const calcAmount = () => {
      setAmount(totApp - proceed - pending);
    };

    calcAmount();
  }, [totApp, proceed, pending, setAmount]);

  // Calculate total amount of items in table
  useEffect(() => {
    let rows = document.querySelectorAll(".amount")
    let sum = 0

    for(let i = 0; i < rows.length; i++) {
      if (rows[i].className === "amount") {
        sum += isNaN(rows[i].innerHTML) ? 0 : parseInt(rows[i].innerHTML)
        setTotal(sum)
      }
    }
  })

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id)
    setList(list.filter((row) => row.id !== id))
    setIsEditing(true)
    setDescription(editingRow.description)
    setTotApp(editingRow.qty)
    setproceed(editingRow.price)

  }

  // Delete function
  const deleteRow = (id) => setList(list.filter((row) => row.id !== id))


  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:mt-10">
          <label htmlFor="description">Specialization</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Select Specialization"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="md:grid grid-cols-3 gap-10">
          <div className="flex flex-col">
            <label htmlFor="qty">Total no. of Appointments</label>
            <input
              type="text"
              name="qty"
              id="qty"
              placeholder="Enter here"
              value={totApp}
              onChange={(e) => setTotApp(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="proceed">Proceed Appoitnments</label>
            <input
              type="text"
              name="proceed"
              id="procedd"
              placeholder="Enter here"
              value={proceed}
              onChange={(e) => setproceed(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pending">Pending Appointments</label>
            <input
              type="text"
              name="pending"
              id="pending"
              placeholder="Enter here"
              value={pending}
              onChange={(e) => setPending(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="amount">Cancle Appointments</label>
            <p>{amount}</p>
          </div>
        </div>

        <button
          className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 mb-3"
          type="submit"
        >
          {isEditing ? "Editing Row Item" : "Add Table Item"}
        </button>
      </form>

      {/* Table items */}
    
      <table width="100%" className="mb-10">
        <thead>
            <tr className="bg-gray-100 p-1">
            <td className="font-bold">Specialization</td>
            <td className="font-bold">Total no. of Appointments</td>
            <td className="font-bold">Proceed Appointments</td>
            <td className="font-bold">Pending Appointments</td>
            <td className="font-bold">Cancle Appointments</td>
            </tr>
        </thead>

        {list.map(({ id, description, totApp, proceed, pending, amount }) => (
            <React.Fragment key={id}>
                <tbody>
                    <tr>
                        <td>{description}</td>
                    
                        <td>{totApp}</td>
                    
                        <td>{proceed}</td>

                        <td>{pending}</td>

                        <td className="amount">{amount}</td>
                        
                        <td><button onClick={() => editRow(id)} ><MdEdit className="text-blue-500 font-bold text-xl"/></button></td>
                        <td><button onClick={() => deleteRow(id)} ><MdDelete className="text-red-500 font-bold text-xl"/></button></td>
                        
                    </tr>
                </tbody>
            </React.Fragment>
        
        ))}
      </table>

      {/* <div>
        <h3 className="flex items-end justify-end text-gray-800 text-4xl font-bold">No. of Appointments Cancle: {total.toLocaleString()}</h3>
      </div> */}

    </>
  );
}
