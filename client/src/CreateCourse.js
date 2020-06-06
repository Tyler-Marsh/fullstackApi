import React from 'react';
import Form from './Form';
class CreateCourse extends React.Component {

  state = {
    errors: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
  }

  render() {
    // get authenticated user
    // to diplay authorship
    const { context } = this.props
    const {firstName, lastName} = context.authenticatedUser;
    
    const { errors }  = this.state
    return (
      <div className="bounds course--detail">
        <h1>Create Course</h1>
        <div>
          <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
              
              <React.Fragment>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Course title"
                      onChange ={this.change}
                      className="input-title course--title--input"
                    />
                    <p> By {firstName + " " + lastName}</p>
                  </div>
                  <div className="course--description">
                    <div>
                      <textarea
                        id="description"
                        name="description"
                        type="text"
                        onChange ={this.change}
                        placeholder="course description..."
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
                            placeholder="estimated course time"
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
                            placeholder="*materials formatted like this *pencil *paper"
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
    </div>
    );
  }

  
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name] : value
      };
    });
  }
// EDIT
  cancel = () => {
    this.props.history.push(`/`);
  };

  // collect data and make a POST request
  submit = () => {
    // destructure for convenience
    const { context } = this.props;
    // get authentication user data
    const { emailAddress, password } = context.authenticatedUser;
    // put authentication user data into one object
    const credentials = { emailAddress, password }
    // destructure take out state variables
    const {title, description, materialsNeeded, estimatedTime } = this.state;
    // 
    const body = {title, description, materialsNeeded, estimatedTime};
    context.data.createCourse(body, credentials)
      .then(err => {
        this.setState({ errors : err});
        if (err.length === 0) {
          this.props.history.push('/');
        }
        }
      );
  }
}

export default CreateCourse