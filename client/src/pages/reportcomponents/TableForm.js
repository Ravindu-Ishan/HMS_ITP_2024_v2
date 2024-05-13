import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TableForm({
  //reportdescription,
  //setReportdescription,
  noofappoinments,
  setNoofappoinments,
  checkedpatients,
  setCheckedpatients,
  minorpatients,
  setMinorpatients,
  canceledappoinments,
  setCanceledappoinments,
  hospitalizationpatients,
  setHospitalizationpatients,
  list,
  setList,
  //total,
  //setTotal,
}) {

    const  [isEditing, setIsEditing] = useState(false)

    const handleInputChange = (e, setter) => {
      const value = e.target.value;
      // Allow only numbers
      if (/^\d*$/.test(value)) {
        setter(value);
      }
    };

    // Submit form function
    const handleSubmit = (e) => {
        e.preventDefault();
        
      // Validate if any input field is empty
    if (!noofappoinments || !checkedpatients || !minorpatients ) {
          alert("Please fill in all inputs")

        }
        
         // Validate input conditions
    if (
      !(noofappoinments > checkedpatients) ||
      !(checkedpatients > minorpatients) ||
      !(noofappoinments > minorpatients)
    ) {
      alert("Please enter valid inputs");
      return;
    }

          const newItems = {
            id: uuidv4(),
            //reportdescription,
            noofappoinments,
            checkedpatients,
            minorpatients,
            canceledappoinments: noofappoinments - checkedpatients, // Calculate canceled appointments here
            hospitalizationpatients: checkedpatients - minorpatients // Calculate hospitalization patients here
          };

          setList([...list, newItems]);
          //setReportdescription("");
          setNoofappoinments("");
          setCheckedpatients("");
          setMinorpatients("");
          setIsEditing(false);
        
    };

  // Edit function
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id)
    setList(list.filter((row) => row.id !== id))
    setIsEditing(true)
    //setReportdescription(editingRow.reportdescription)
    setNoofappoinments(editingRow.noofappoinments)
    setCheckedpatients(editingRow.checkedpatients)
    setMinorpatients(editingRow.minorpatients)
    setCanceledappoinments(editingRow.canceledappoinments)
    setHospitalizationpatients(editingRow.hospitalizationpatients)
  }

  // Delete function
  const deleteRow = (id) => setList(list.filter((row) => row.id !== id))

  return (
    <>
      <form onSubmit={handleSubmit}>
      {/*<div className="flex flex-col md:mt-16">
          <label htmlFor="reportdescription">Report Description</label>
          <input
            type="text"
            name="reportdescription"
            id="reortdescription"
            placeholder="Report Description"
            value={reportdescription}
            onChange={(e) => setReportdescription(e.target.value)}
          />
  </div>*/}

        <div className="md:grid grid-cols-3 gap-10">
          <div className="flex flex-col">
            <label htmlFor="noofappoinments">Scheduled Appoinments</label>
            <input
              type="text"
              name="noofappoinments"
              id="noofappoinments"
              placeholder="No Of Appoinments"
              value={noofappoinments}
              onChange={(e) => handleInputChange(e, setNoofappoinments)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="checkedpatients">Checked Patients</label>
            <input
              type="text"
              name="checkedpatients"
              id="checkedpatients"
              placeholder="Checked Patients"
              value={checkedpatients}
              onChange={(e) => handleInputChange(e, setCheckedpatients)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="minorpatients">Minor illnesses patients</label>
            <input
              type="text"
              name="minorpatients"
              id="minorpatients"
              placeholder="Minor Patients"
              value={minorpatients}
              onChange={(e) => handleInputChange(e, setMinorpatients)}
            />
          </div>

          {/*<div className="flex flex-col">
            <label htmlFor="canceledappoinments">Canceled Appoinments</label>
            <p>{canceledappoinments}</p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="hospitalizationpatients">Patients scheduled for hospitalization</label>
            <p>{hospitalizationpatients}</p>
          </div>*/}
        </div>

        
        <button
          className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 mb-3"
          type="submit"
        >
          {isEditing ? "Editing Row Item" : "Add Table Item"}
        </button>
      </form>

      {/* Table */}
      <table width="100%" className="mb-10">
        <thead>
        <tr className="bg-gray-100 p-1">
                {/*<td className="font-bold">Report Description</td>*/}
            
                <td className="font-bold">Scheduled Appoinments</td>
            
                <td className="font-bold">Checked Patients</td>
            
                <td className="font-bold">Minor illnesses patients</td>

                <td className="font-bold">Canceled Appoinments</td>

                <td className="font-bold">Patients scheduled for hospitalization</td>
            </tr>
        </thead>
        <tbody>
          {list.map(({ id, noofappoinments, checkedpatients, minorpatients, canceledappoinments, hospitalizationpatients }) => (
            <tr key={id}>
              {/* Table data */}
              {/*<td>{reportdescription}</td>*/}
              <td>{noofappoinments}</td>
              <td>{checkedpatients}</td>
              <td>{minorpatients}</td>
              <td className="canceledappoinments">{canceledappoinments}</td>
              <td className="hospitalizationpatients">{hospitalizationpatients}</td>
              {/*<td>{canceledappoinments}</td>
              <td>{hospitalizationpatients}</td>*/}
              <td><button onClick={() => editRow(id)} ><MdEdit className="text-blue-500 font-bold text-xl"/></button></td>
              <td><button onClick={() => deleteRow(id)} ><MdDelete className="text-red-500 font-bold text-xl"/></button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      {/*<div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">Rs. {total.toLocaleString()}</h2>
        </div>*/}
    </>
  );
}