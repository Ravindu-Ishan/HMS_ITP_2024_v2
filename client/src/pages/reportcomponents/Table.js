import React from "react";

export default function Table(
    { list } //total
) {

  return (
    <>
      <table width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            {/*<td className="font-bold">Report Description</td>*/}
            <td className="font-bold">Scheduled Appoinments</td>
            <td className="font-bold">Checked Patients</td>
            <td className="font-bold">Minor illnesses patients </td>
            <td className="font-bold">Canceled Appoinments</td>
            <td className="font-bold">Patients scheduled for hospitalization</td>
          </tr>
        </thead>

        {list.map(({ id, noofappoinments, checkedpatients, minorpatients, canceledappoinments, hospitalizationpatients }) => (
          <tbody key={id}>
            <tr>
              {/*<td>{reportdescription}</td>*/}
              <td>{noofappoinments}</td>
              <td>{checkedpatients}</td>
              <td>{minorpatients}</td>
              <td>{canceledappoinments}</td>
              <td>{hospitalizationpatients}</td>
            </tr>
          </tbody>

        ))}

      </table>

      {/*<div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">Rs. {total.toLocaleString()}</h2>
      </div>*/}

    </>
  );
}