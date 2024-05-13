import React from "react";

export default function Table(
    { list, total }
) {

  return (
    <>
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
          <tbody key={id}>
            <tr>
              <td>{description}</td>
              <td>{totApp}</td>
              <td>{proceed}</td>
              <td>{pending}</td>
              <td>{amount}</td>
            </tr>
          </tbody>

        ))}

      </table>

      {/* <div>
        <h3 className="flex items-end justify-end text-gray-800 text-4xl font-bold">No. of Appointments Cancle: {total.toLocaleString()}</h3>
      </div> */}

    </>
  );
}
