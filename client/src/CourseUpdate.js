/* eslint-disable */
import React from 'react';
import Form from './Form';
 export default class CourseUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  } 

  state = {
    errors: []
  }
  
  componentDidMount() {
    // get url param
    const id = this.props.match.params.id
    //api call using id for particular course
   this.props.context.data.viewCourse(id)
    .then(result => {
      const data = result.result[0]
      this.setState({ data })
    })
    .catch(err => {
      this.setState({ errors: err})
    });
   } 

  render() {
    /* const {
      title,
      teacher,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state; 
    */

   
   if (!this.state.data) {
    return (
     <div className="bounds">
      <h3> Loading... </h3>
     </div>
    );
   }
   else { 
    //make data more accessible
    const course = this.state.data
    const errors = this.state.errors;
    //const body = { title, description, estimatedTime, materialsNeeded } = course
    return (
      <div className="bounds course--detail">
        <h1>Update Course</h1>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      defaultValue={course.title}
                      onChange ={this.change}
                      className="input-title course--title--input"
                    />
                    <p> By {course.firstName + " " + course.lastName}
                    </p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        onChange ={this.change}
                        defaultValue={course.description}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                          <input
                            id="estimatedTime"
                            name="estimatedTime"
                            type="text"
                            onChange ={this.change}
                            className="course--time--input"
                            defaultValue={course.estimatedTime}
                          />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                          <textarea
                            id="materialsNeeded"
                            name="materialsNeeded"
                            type="text"
                            defaultValue={course.materialsNeeded}
                            onChange ={this.change}
                            className="course--materials--input"
                          ></textarea>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
      </div>
    );
  }}


  change = (event) => {
    // different change method event for nested data
    const name = event.target.name;
    const value = event.target.value;
    // spread operator to ensure the rest of data is intact
    const data  = { ...this.state.data};
    data[name] = value;
    this.setState({ data
    });
  }
  cancel = () => {
    this.props.history.push(`/courses/${this.state.data.id}`);
  };

  // submit method for form
  // destructure to pull data out
  // call updateCourse method
  // if no errors in the .then chain
  // the push them to the home screen '/'
  submit = () => {
    const { context } = this.props;
    
    const { emailAddress, password } = context.authenticatedUser;
    let { title, description, estimatedTime, materialsNeeded } = this.state.data;


    const body = {title, description, estimatedTime, materialsNeeded};
    // call PUT method
    const id = this.props.match.params.id;
    const credentials = { emailAddress, password};
    context.data.updateCourse(body, id, credentials)
      .then(err => {
        this.setState({ errors : err})
        console.log(err)
        if (err.length === 0) {
          this.props.history.push(`/`)
        }
      });
  }

}