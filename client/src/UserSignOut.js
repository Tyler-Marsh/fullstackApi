import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({context}) => {
    // signs out and redirects users to the courses list
  context.actions.signOut();
  return (
    <Redirect to="/" />
  );
};