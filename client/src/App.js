import React from 'react';

import { BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

// import style
import './styles/global.css'

// import components
import Header from './Header';
import Courses from './Courses';
import UserSignUp from './UserSignUp';
import UserSignIn from './UserSignIn';
import CourseDetail from './CourseDetail';
import CourseUpdate from './CourseUpdate';
import UserSignOut from './UserSignOut';
import CreateCourse from './CreateCourse';
import PrivateRoute from './PrivateRoute';
// import HOC to provide components with context
import withContext from './Context';

// connect components to context

const HeaderWithContext = withContext(Header);

const CoursesWithContext = withContext(Courses);

const UserSignUpWithContext = withContext(UserSignUp);

const UserSignInWithContext = withContext(UserSignIn);

const CourseUpdateWithContext = withContext(CourseUpdate);

const CourseDetailWithContext = withContext(CourseDetail);

const UserSignOutWithContext = withContext(UserSignOut);

const CreateCourseWithContext = withContext(CreateCourse);


export default () => (
  <Router>
    <div className="App">
     <HeaderWithContext />
     <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signin"  component={UserSignInWithContext} />
        <PrivateRoute exact path="/courses/create" component={CreateCourseWithContext} />
        <Route exact path="/courses/:id" component={CourseDetailWithContext} />
        <PrivateRoute exact path="/courses/:id/update" component={CourseUpdateWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
     </Switch>
    </div>
  </Router>
);