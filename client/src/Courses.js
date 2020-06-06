/* eslint-disable */
import React from 'react';
import { Link } from 'react-router-dom';
class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  /* async getCourses() {
    // await the fetch of the data and then the .json steam reading
   let data = await (await fetch('http://localhost:5000/api/courses')).json()
   await this.setState({
     data: data
   });
  }
  */
  // fetch the courses data and put it in state.
  componentDidMount() {
   // this.getCourses();
  this.props.context.data.getCourses()
    .then(data => {
      this.setState({data})
    })
    .catch(err => {
      console.log(err)
    });
  }

    // "Loading" &&
  render() {
  
   if (!this.state.data.result) {
     return (
      <div className="bounds">
       <h3> Loading... </h3>
      </div>
     );
   } else {
     return (
      <div className="bounds">
      {"Loading..." && this.state.data.result.map(course =>
        <div className="grid-33" key={course.courseID}><Link className="course--module course--link" to={`/courses/${course.courseID}`}>
          <h4 className="course--label">Course</h4>
          <h3 className="course--title">{course.title}</h3>
        </Link></div>
        )}
      <div className="grid-33"><Link className="course--module course--add--module" to="/courses/create">
          <h3 className="course--add--title"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
              viewBox="0 0 13 13" className="add">
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>New Course</h3>
        </Link></div>
      </div>
     ); 
   }
  }
}
export default Courses;