import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Index from './components/Index.jsx';
//import UserProfile from './components/Uploads.jsx';

const index = () => <Index />;
const profile = () => <UserProfile />;

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={index} />
      <Route path="/user/profile/" component={profile} />
    </div>
  </Router>
);

ReactDOM.render(<AppRouter />, document.getElementById('app'));