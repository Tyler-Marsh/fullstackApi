import React from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';

class UserSignUp extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {

    const { firstName, lastName, emailAddress, password, errors} = this.state;

    return (
      
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            submitButtonText="Sign Up"
            errors={errors}
            submit={this.submit}
            cancel={this.cancel}
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text" 
                  placeholder="first name"
                  value={firstName}
                  onChange={this.change} />
                <input 
                  id="lastName" 
                  name="lastName" 
                  type="text" 
                  placeholder="last name"
                  value={lastName}
                  onChange={this.change} />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  placeholder="Email"
                  value={emailAddress}
                  onChange={this.change} />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={this.change}
                  />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
        </div>
      </div>
    );
  }

  
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
     const { 
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };
// on response of 400
// set state to errors so validation
// is shown to users
// username === email
    context.data.createUser(user)
      .then( errors => {
        if (errors.length) {
          this.setState({ errors })
        }
        else {
          context.actions.signIn(emailAddress, password)
          .then(() => {
            this.props.history.push('/');
          });
        }
      });
  }

cancel = () => {
  this.props.history.push('/');
}
}

export default UserSignUp