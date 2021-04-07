import React from 'react';
import './App.css';
import {Route, Switch} from 'react-router-dom';

 
//import multiple components into the app
import Upload from './components/upload.component';
import DashBoard from './components/dashboard.component';
import Test from './components/test.component';

function App() {
  return (
    <div className="app">
        <Switch>
          <Route exact path="/" component={Upload} /> localhost:3000/
          <Route path="/dashboard" component={DashBoard} />
          <Route path="/test" component={Test} />
        </Switch>
    </div>
  );
}

export default App;
