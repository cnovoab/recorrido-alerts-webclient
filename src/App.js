import React, { Component } from 'react';
import './App.css';
import { Router, Switch, Route} from 'react-router-dom';
import { Reminder } from './reminders/reminder.component';
import { AddReminder } from './reminders/addreminder.component'
import { ShowReminder } from './reminders/showreminder.component'
import { Login } from './login/';
import { Home } from './home/';
import { history } from './_helpers';
import { PrivateRoute } from './_components';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <div>
              <Switch>
                <PrivateRoute exact path='/home' component={Home} />
                <PrivateRoute exact path='/reminder' component={Reminder} />
                <PrivateRoute exact path='/add-reminder' component={AddReminder} />
                <PrivateRoute exact path='/edit-reminder/:id' component={AddReminder} />
                <PrivateRoute exact path='/show-reminder/:id' component={ShowReminder} />
                <Route exact path='/' component={Login} />
              </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
