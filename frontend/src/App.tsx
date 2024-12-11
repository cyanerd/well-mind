// package.json homepage should be "http://well-mind.ru"
// if u want to create mobile change it to "."

import {
  BrowserRouter as Router, // use HashRouter for mobile
  Switch,
} from 'react-router-dom';
import {GuardProvider, GuardedRoute, GuardFunction, Next} from 'react-router-guards';
import {GuardToRoute, GuardFunctionRouteProps} from 'react-router-guards/dist/types';
import api from './Api';
import {setUser} from './redux/app';
import {useDispatch} from 'react-redux';
import store from './redux/store';
import React from 'react';
import { fetchContent } from './redux/fetchContent';

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
import ProfileEmail from './pages/ProfileEmail';
import ProfileEmailGo from './pages/ProfileEmailGo';
import Library from './pages/Library';
import LibraryItem from './pages/LibraryItem';
import Psychologists from './pages/Psychologists';
import ProfilePayment from './pages/ProfilePayment';
import Promo from './pages/Promo';

// assets
import './App.css';
import './AppMobile.css';

const App: React.FC = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);

  const requireLogin = (to: GuardToRoute, from: GuardFunctionRouteProps, next: Next) => {
    const user = store.getState().app.user;
    if (to.meta.auth) {
      if (user) {
        if (to.meta.scheme) {
          if (user.scheme) {
            if (to.meta.subscribe) {
              if (user.subscription.active || user.login === '79999999999') {
                next();
              } else {
                next.redirect('/promo');
              }
            } else {
              next();
            }
          } else {
            next.redirect('/promo');
          }
        } else {
          next();
        }
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

  // @ts-ignore
  const guard: GuardFunction = async (to: GuardToRoute, from: GuardFunctionRouteProps, next: Next) => {
    const getUser = async () => {
      const response = await api.request('user');
      if (response.user) dispatch(setUser(response.user));
      else dispatch(setUser(null));
    }

    await getUser();
    requireLogin(to, from, next);
  }

  return (
    <Router>
      <GuardProvider guards={[guard]} error={NoMatch}>
        <Switch>
          <GuardedRoute exact path="/login" meta={{guest: true}} component={Login}/>
          <GuardedRoute exact path="/test" meta={{auth: true}} component={Test}/>
          <GuardedRoute exact path="/contacts" component={Contacts}/>
          <GuardedRoute exact path="/policy" component={Policy}/>
          <GuardedRoute exact path="/offer" component={Offer}/>
          <GuardedRoute exact path="/program" meta={{auth: true, scheme: true}} component={Program}/>
          <GuardedRoute exact path="/program/:id" meta={{auth: true, scheme: true, subscribe: true}} component={ProgramItem}/>
          <GuardedRoute exact path="/psychologists" component={Psychologists}/>
          <GuardedRoute exact path="/library" component={Library}/>
          <GuardedRoute exact path="/library/:code" component={LibraryItem}/>
          <GuardedRoute exact path="/profile" meta={{auth: true}} component={Profile}/>
          <GuardedRoute exact path="/profile/change-password" meta={{auth: true}} component={ProfileChangePassword}/>
          <GuardedRoute exact path="/profile/email" meta={{auth: true}} component={ProfileEmail}/>
          <GuardedRoute exact path="/profile/email-go" meta={{auth: true}} component={ProfileEmailGo}/>
          <GuardedRoute exact path="/profile/payment" meta={{auth: true}} component={ProfilePayment}/>
          <GuardedRoute exact path="/promo" component={Promo}/>
          <GuardedRoute exact path="/" component={Main}/>
          <GuardedRoute path="*" component={NoMatch}/>
        </Switch>
      </GuardProvider>
    </Router>
  );
}

export default App;
