import React, { Component } from 'react';
// Importing top navigation bar components
import TopNavPatient from '../../components/TopNavPatient';

class Summary extends Component {
  render() {
    return (
      <>
      
      
        <div className="navarea">
          <TopNavPatient/>
        </div>
        <main>
        <div>
        <h2>Reports Summary</h2>
        {/*<p>This is the Reports History page.</p>*/}
        
      </div>
      </main>
      </>
    );
  }
}

export default Summary;




