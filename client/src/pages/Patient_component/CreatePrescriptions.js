import React, { Component } from 'react';
import axios from 'axios';
import TopNavPatientProfile from '../../components/TopNavPatientProfile';

export default class CreatePrescriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      diagnosis: '',
      medications: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { date, diagnosis, medications } = this.state;
    if (!date || !diagnosis.trim() || !medications.trim()) {
      alert('Please fill all fields');
      return;
    }
    const data = {
      date: date,
      diagnosis: diagnosis,
      medications: medications
    };
    axios.post('/prescription/save', data).then((res) => {
      if (res.data.success) {
        this.setState({
          date: '',
          diagnosis: '',
          medications: ''
        });
      }
    });
  };

  render() {
    return (
      <>
        <div className="navarea">
          <TopNavPatientProfile />
        </div>
        <main>
          <div className="col-md-8 mt-4 mx-auto">
            <form className="needs-validation">
              <div className="text-xl ml-5 mb-5 font-bold text-gray-600">
                Create Prescriptions
              </div>

              <div class="md:flex md:items-center mb-6">
                <div class="md:w-1/3">
                  <label
                    class="block text-black font-bold md:text-right mb-1 md:mb-0 pr-4"
                    for="inline-full-name"
                  >
                    Date :
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    class="bg-white appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="date"
                    className="form-control rounded-lg"
                    id="date"
                    name="date"
                    placeholder="Date"
                    value={this.state.date}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '15px', width: '870px' }}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Diagnosis</label>
                <textarea
                  className="form-textarea rounded-lg"
                  name="diagnosis"
                  rows="7"
                  style={{ width: '100%', maxWidth: '100%' }}
                  placeholder="Description of diagnosis"
                  value={this.state.diagnosis}
                  onChange={this.handleInputChange}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '15px', width: '870px' }}>
                <label style={{ marginBottom: '5px', fontWeight: 'bold' }}>Medications</label>
                <textarea
                  className="form-textarea rounded-lg"
                  name="medications"
                  rows="7"
                  style={{ width: '100%', maxWidth: '100%' }}
                  placeholder="Description of medications"
                  value={this.state.medications}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="flex justify-center items-center h-screen">
                <button
                  className="bg-cyan-400 text-black rounded-full px-4 py-2 border-1 border-cyan-400 hover:bg-cyan-500 hover:border-cyan-500"
                  type="submit"
                  onClick={this.onSubmit}
                >
                  <i className="far fa-check-square"></i>
                  &nbsp; Add new prescription
                </button>
              </div>
            </form>
          </div>
        </main>
      </>
    );
  }
}
