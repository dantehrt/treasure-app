import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AddCalenderPage from './AddCalenderPage';
import ShowCalenderPage from "./ShowCalenderPage";
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
              <Route exact path='/:calender_url' component={ShowCalenderPage}/>
              <Route path='/:calender_url/add' component={AddCalenderPage}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;