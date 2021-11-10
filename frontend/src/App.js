import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import RouterApi from './RouterApi';
import {GuardProvider, GuardedRoute} from 'react-router-guards';
import api from './Api';
import {setUser} from './redux/app';
import {useDispatch} from 'react-redux';
import store from './redux/store';

// pages
import Main from './pages/Main';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Test from './pages/Test';
import Contacts from './pages/Contacts';
import Policy from './pages/Policy';
import Offer from './pages/Offer';
import Program from './pages/Program';
import ProgramItem from './pages/ProgramItem';
import Profile from './pages/Profile';
import ProfileChangePassword from './pages/ProfileChangePassword';
import ProfileEmailGo from './pages/ProfileEmailGo';
import Library from './pages/Library';
import LibraryItem from './pages/LibraryItem';
import Psychologists from './pages/Psychologists';

// assets
import './App.css';
import './AppMobile.css';

export default function App() {
  const dispatch = useDispatch();

  const requireLogin = (to, from, next) => {
    const user = store.getState().app.user;
    console.log('user is', user);
    if (to.meta.auth) {
      if (user) {
        next();
      }
      next.redirect('/login');
    } else {
      if (to.meta.guest) {
        if (!user) {
          next();
        }
        next.redirect('/profile');
      } else {
        next();
      }
    }
  };

  const guard = async (to, from, next) => {
    const getUser = async () => {
      const response = await api.request('user');
      console.log('user', response.user);
      if (response.user) dispatch(setUser(response.user));
      else dispatch(setUser(null));
    }

    await getUser();
    requireLogin(to, from, next);
  }

  return (
    <>
      <Router>
        <RouterApi>
          <GuardProvider guards={[guard]} error={NoMatch}>
            <Switch>
              <GuardedRoute exact path="/login" meta={{guest: true}} component={Login}/>
              <GuardedRoute exact path="/test" component={Test}/>
              <GuardedRoute exact path="/contacts" component={Contacts}/>
              <GuardedRoute exact path="/policy" component={Policy}/>
              <GuardedRoute exact path="/offer" component={Offer}/>
              <GuardedRoute exact path="/program" component={Program}/>
              <GuardedRoute exact path="/program/:day" component={ProgramItem}/>
              <GuardedRoute exact path="/psychologists" component={Psychologists}/>
              <GuardedRoute exact path="/library" component={Library}/>
              <GuardedRoute exact path="/library/:id" component={LibraryItem}/>
              <GuardedRoute exact path="/profile" meta={{auth: true}} component={Profile}/>
              <GuardedRoute exact path="/profile/change-password" meta={{auth: true}} component={ProfileChangePassword}/>
              <GuardedRoute exact path="/profile/email-go" meta={{auth: true}} component={ProfileEmailGo}/>
              <GuardedRoute exact path="/" component={Main}/>
              <GuardedRoute path="*" component={NoMatch}/>
            </Switch>
          </GuardProvider>
        </RouterApi>
      </Router>
    </>
  );
}
