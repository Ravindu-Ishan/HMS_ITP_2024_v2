// Import React and the necessary dependencies
import React, { Component } from 'react';
import TopNavPatientProfile from '../../components/TopNavPatientProfile';


// Define the LabReports component
class LabReports extends Component {
  render() {
    return (
      <>

        {/* top nav imported to this section */}
        <div className="navarea">
          <TopNavPatientProfile/>
        </div>
      <div>
       
        
        <p>This is the LabReports page.</p>
      </div>
      </>
    );
  }
}

// Export the LabReports component
export default LabReports;
