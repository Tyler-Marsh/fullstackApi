import React from 'react';
// to render course description and materials needed
// transforms materials needed into a list neatly
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';


class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // get url param
    const id = this.props.match.params.id
    
    //api call using id for particular course
   this.props.context.data.viewCourse(id)
    .then(data => {
      this.setState({data})
    })
    .catch(err => {
      console.log(err)
    });
   }

  // remove condtional rendering check state
  render() {
    
    if (!this.state.data.result) {
      return (
       <div className="bounds">
        <h3> Loading... </h3>
       </div>
      );
      }

    else {
      // to link to update page
     const id = this.props.match.params.id
     // get data out
      const course = this.state.data.result[0]
      // destructure for clearer syntax
    const {
      description,
      estimatedTime,
      materialsNeeded,
      title,
      emailAddress,
      userId
    } = course;
    const authUser = this.props.context.authenticatedUser;
    // create teacher variable
    const teacher = (course.firstName + " " + course.lastName);
    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span>
            { authUser.id === course.userId ?

             (<div>
               <Link className="button" to={`/courses/${id}/update`}>Update Course</Link><Link className="button" onClick={this.handleDelete} to={`#`}>Delete Course</Link><Link
                className="button button-secondary" to="/">Return to List</Link>
               </div>)
             :
             (<div><Link
                className="button button-secondary" to="/">Return to List</Link></div>)
            }
              </span></div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{title}</h3>
              <p>By {teacher}</p>
              <p>Email: {emailAddress}</p>
            </div>
            <div className="course--description">
              {<ReactMarkdown source={description} />}
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime || 'N/A'}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>{ <ReactMarkdown source={materialsNeeded || 'N/A'} />
                  }
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
    );
  }}

  handleDelete() {
    // get credentials to delete a course
    const { context } = this.props;
    const { emailAddress, password } = context.authenticatedUser;
    const credentials  = { emailAddress, password };
    // get the id for the specific course
    const id = this.props.match.params.id;
    // deleteCourse takes 
    // id, credentials
    context.data.deleteCourse(id, credentials)
      .then(err => {
        if (err.status === 204) {
          this.props.history.push('/');
        }
        else {

        this.setState({ errors: err });
        }
      });
  }
}

export default CourseDetail;