import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'; // ES6 destructuring syntax
import App from './components/App';
import Home from './components/pages/Home';
import IndexPage from './components/pages/IndexPage';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Project from './components/pages/Project';
import './components/App.css'

//browserHistory: make URL path simpler without # and ugly query string
//IndexRoute: going to / would render App with IndexPage passed as a child
const routes = (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={IndexPage}/>   
        <Route path="/projects" component={Home}/>
        <Route path="/projects/:id" component={Project}/>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
      </Route>
    </Router>
);

// <body> <div id="root"> </div></body>  in HTML
ReactDOM.render(routes, document.getElementById('root'));  
