import React, { Component } from 'react';
import TopNavAppointmet from '../../components/TopNavAppointment';

export default class ReportGen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  render() {
    return (
      <>
        <div className='navarea'>
          <TopNavAppointmet />
        </div>

        <main>
          <div>
            <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
              <a href="/reportApp" style={{ textDecoration: 'none', color: 'inherit' }}>Create Report</a>
            </button>
            <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Upload Report</button>

            <div className="table-responsive overflow-x-auto sm:rounded-lg tablestyle">
            <table className="w-full text-sm border-separate border-spacing-x-0 border-spacing-y-2 text-gray-500 table table-striped table-bordered">
              <thead className="text-xs text-gray-700 uppercase bg-white thead-dark">
                <tr>
                  <th className="p-3" scope="col">#</th>
                  <th className="p-3" scope="col">Date</th>
                  <th className="p-3" scope="col">Time</th>
                  <th className="p-3" scope="col">Report</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-gray-600 bg-white hover:bg-gray-200 hover:text-black">
                  <th scope="row">1</th>
                  <td className="text-center py-2 px-4">11/04/2024</td>
                  <td className="text-center py-2 px-4">22:30</td>
                  <td className="text-center py-2 px-4">Uploaded File</td>
                </tr>
              </tbody>
            </table>
            </div>

          </div>
        </main>
      </>
    );
  }
}
