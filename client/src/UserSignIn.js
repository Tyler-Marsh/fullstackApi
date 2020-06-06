import React from 'react';
import Form from './Form';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
class UserSignIn extends React.Component {
 state = {
   emailAddress: '',
   password: '',
   errors: [],
 }

 render() {
   const {
     emailAddress,
     password,
     errors,
   } = this.state;

 return (
  <div className="bounds">
    <div className="grid-33 centered signin">
    <h1>Sign In</h1>
    <Form 
      cancel={this.cancel}
      errors={errors}
      submit={this.submit}
      submitButtonText="Sign In"
      elements={() => (
        <>
          <input 
            id="emailAddress" 
            name="emailAddress" 
            type="text"
            value={emailAddress} 
            onChange={this.change} 
            placeholder="User Name" />
          <input 
            id="password" 
            name="password"
            type="password"
            value={password} 
            onChange={this.change} 
            placeholder="Password" />                
        </>
      )} />
    <p>
      Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
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
        [name] : value
      };
    });
  }


  submit = () => {
    // I was't destructuring which made context literally = to this.props
    const { context } = this.props;
    const { emailAddress, password } = this.state;
    const credentials = { emailAddress, password };
    //const { from } = this.props.location.state || { from: { pathname: '/authenticated' } };
    context.actions.signIn(credentials)
      .then( user => {
        if ( user === null) {
          this.setState(() => {
            return { errors: ['Please check your username or password']}
          });
          //this.props.history.push('/');
        }
        else {
          if (user !== null) {
            user.password = password;
            this.setState(() => {
              return {
                authenticatedUser: user,
              };
            });
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
          }
          this.props.history.push('/')
        }

      })
      .catch(err => {
        console.log(err);
        this.props.history.push('/error');
      })
  
  }
  cancel = () => {
    this.props.history.push('/')
  }
}
export default UserSignIn;