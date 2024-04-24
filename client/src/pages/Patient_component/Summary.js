import React, { Component } from 'react';
import NavBar from './NavBar';

class Summary extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h2>Reports Summary</h2>
        {/*<p>This is the Reports History page.</p>*/}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="btn btn-success"><a href="/reportApp" style={{ textDecoration: 'none', color: 'white' }}> + Create New Report</a></button>

        </div>
        <table className="table">
      <thead>
        <tr>
          <th scope="col">Report No</th>
          <th scope="col">Uploaded Date</th>
          <th scope="col">Uploaded File</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      </table>
      </div>
    );
  }
}

export default Summary;




{/*import React, { Component } from 'react';
//import NavBar from './components/NavBar';
import NavBar from './NavBar';


class Summary extends Component {
  render() {
    return (
      <div>
        <NavBar />
        
        <h1>Reports History</h1>
        <p>This is the Reports History page.</p>
        <button className="btn btn-success"><a href="/reportApp" style={{ textDecoration: 'none', color: 'white' }}> + Create New Report</a></button>
        <button className="btn btn-success"><a href="#" style={{ textDecoration: 'none', color: 'white' }}> Uplode Report</a></button>
        
      </div>
    );
  }
}

export default Summary;*/}








