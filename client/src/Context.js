
import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

// create provider class
// contain value to pass to children
// and methods in the helper data class to pass
// check for cookies
export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }
  // set state for cookies
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  signIn = async (credentials) => {
    const user = await this.data.getUser(credentials);
    if(user !== null) {
      user.password = credentials.password;
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1});
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null});
    Cookies.remove('authenticatedUser');
  }
}
export const Consumer = Context.Consumer;


/**
 * @param {class} Component - A react component
 * @returns {function} A higher-order component
 * connects components to context/state
 */

 export default function withContext(Component) {
   return function ContextComponent(props) {
     return (
       <Context.Consumer>
         {context => <Component {...props} context={context} />}
       </Context.Consumer>
     );
   }
 }