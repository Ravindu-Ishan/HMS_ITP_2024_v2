import React, { Component } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default class ShiftMain extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    this.retrievePosts();
  }

  
  retrievePosts() {
    const {smid} = useParams();
    axios.get(`/shift/getonly/${smid}`).then(res => {
        if (res.data.success) {
          this.setState({
            posts: res.data.shifts
          });
          console.log(this.state.posts);
        }
      });
      
  }

  onDelete = (id) => {
    axios.delete(`/shift/delete/${id}`).then((res) => {
      alert("Deleted Successfully");
      this.retrievePosts();
    })
    
      
  }

  filterData(posts, searchkey) {
    const result = posts.filter(post =>
      
      post.RoomNumber.includes(searchkey) ||
      post.ScheduleTime.includes(searchkey) ||
      post.ScheduleDate.includes(searchkey)
    );
    this.setState({ posts: result });
  }

  handleSearchArea = (e) => {
    const searchkey = e.currentTarget.value.toLowerCase();
    axios.get("/shift")
      .then(res => {
        if (res.data.success) {
          this.filterData(res.data.existingPosts, searchkey);
        }
      })
      .catch(error => {
        console.error("Error searching posts:", error);
        // Handle error state here
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <h4>All Posts</h4>
          </div>

          <div className="col-lg-3 mt-2 mb-2">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              name="searchQuery"
              onChange={this.handleSearchArea}
            />
          </div>
        </div>

        <table className="table table-hover" style={{ marginTop: '40px' }}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Schedule Time</th>
              <th scope="col">Schedule Date</th>
              <th scope="col">Room Number</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post, index) => (
              <tr key={index}>
                
                <td>
                  <a href={`/post/${post._id}`} style={{ textDecoration: 'none' }}>
                  {index + 1}
                  </a>
                </td>
                <td>{post.ScheduleTime}</td>
                <td>{post.ScheduleDate}</td>
                <td>{post.RoomNumber}</td>
                
                <td>
                  <a className="btn btn-warning" href={`/edit/${post._id}`}>
                    <i className="fas fa-edit"></i>&nbsp;Edit
                  </a>
                  &nbsp;
                  <button className="btn btn-danger" href="#" onClick={() => this.onDelete(post._id)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn btn-success">
          <a href="/add" style={{ textDecoration: 'none', color: 'white' }}>Create New Shift</a>
        </button>
      </div>
    );
  }
}
