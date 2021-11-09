import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import RouterApi from './RouterApi';

// pages
import Main from './pages/Main';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Test from './pages/Test';
import Contacts from './pages/Contacts';
import Policy from './pages/Policy';
import Offer from './pages/Offer';
import Program from './pages/Program';
import Profile from './pages/Profile';

// assets
import './App.css';
import './AppMobile.css';

export default function App() {
  return (
    <>
      <Router>
        <RouterApi>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/test" component={Test}/>
            <Route path="/contacts" component={Contacts}/>
            <Route path="/policy" component={Policy}/>
            <Route path="/offer" component={Offer}/>
            <Route path="/program" component={Program}/>
            <Route path="/profile" component={Profile}/>
            <Route exact path="/" component={Main}/>
            <Route path="*" component={NoMatch}/>
          </Switch>
        </RouterApi>
      </Router>
    </>
  );
}
