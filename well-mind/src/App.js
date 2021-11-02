import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Tour from './components/tour/Tour';
import ScrollToTop from './ScrollToTop';

// pages
import Main from './pages/Main';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Test from './pages/Test';
import Contacts from './pages/Contacts';
import Policy from './pages/Policy';
import Offer from './pages/Offer';

// assets
import './App.css';
import './AppMobile.css';

export default function App() {
  return (
    <>
      <Tour/>
      <Router>
        <ScrollToTop>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/test" component={Test}/>
            <Route path="/contacts" component={Contacts}/>
            <Route path="/policy" component={Policy}/>
            <Route path="/offer" component={Offer}/>
            <Route exact path="/" component={Main}/>
            <Route path="*" component={NoMatch}/>
          </Switch>
        </ScrollToTop>
      </Router>
    </>
  );
}
