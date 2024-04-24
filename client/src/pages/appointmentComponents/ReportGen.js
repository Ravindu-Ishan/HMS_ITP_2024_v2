import React, { Component } from 'react';

export default class ReportGen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        posts:[]
    };
  }

  render() {
    return (
      <div>
        
        <button><a href="/reportApp" style={{textDecoration:'none', color:'black'}}>Create Report</a></button>
        <button>Upload Report</button>

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
    );
  }
}

//export default MyComponent;