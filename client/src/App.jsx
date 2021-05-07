import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Interview from './components/Interview'
import NewInterview from './components/NewInterview'
import ViewInterview from './components/ViewInterview'
import ReviewInterview from './components/ReviewInterview'


import './App.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/interview/interview_id">
            <Interview />
          </Route>
          <Router path="/interview/new">
            <NewInterview />
          </Router>
          <Route path="/interview/:interview_id/view">
            <ViewInterview />
          </Route>
          <Route path="/interview/:interview_id/review">
            <ReviewInterview />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
