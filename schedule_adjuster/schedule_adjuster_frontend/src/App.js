import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddCalendarPage from './AddCalendarPage';
import ShowCalendarPage from "./ShowCalendarPage";
import Home from './Home';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route exact path='/:calendar_url' component={ShowCalendarPage}/>
              <Route path='/:calendar_url/add' component={AddCalendarPage}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;