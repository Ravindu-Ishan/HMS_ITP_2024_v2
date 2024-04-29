import React, { Component } from 'react';
import TopNavAppointmet from '../../components/TopNavAppointment';

export default class ReportGen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        posts:[]
    };
  }

  render() {
    return (

      <>

      <div className='navarea'>
          <TopNavAppointmet/>
        </div>

      <main>
      <div>
        
        <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"><a href="/reportApp">Create Report</a></button>
        <button className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Upload Report</button>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Report</th>
            </tr>
          </thead>

          <tbody>
          
            <tr>
                <th scope="row">1</th>
                <td>11/04/2024</td>
                <td>22:30</td>
                <td>Upoloaded File</td>
            </tr>
          
          </tbody>

        </table>

      </div>

      </main>
      </>
    );
  }
}

//export default MyComponent;