import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import jwtDecode from 'jwt-decode'
import { Provider } from 'react-redux'

import { SET_AUTHENTICATED } from './redux/types'
import { logOut, getUserData } from './redux/userActions'
import store from './redux/store'
import Navbar from './components/Navbar';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import AuthRoute from './components/AuthRoute'
import axios from 'axios'
import User from './components/User'
const theme = createMuiTheme({

  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff6333',
      main: '#ff3d00',
      dark: '#b22a00',
      contrastText: '#fff',

    },
    form: {
      textAlign: 'center'
    },
    pageTitle: {
      margin: '10px auto'
    },
    textField: {
      margin: '10px auto'
    },
    button: {
      marginTop: '20px',
      position: 'relative'
    },
    customError: {
      marginTop: '10px',
      color: 'red'
    },
    progress: {
      position: 'absolute'
    }
  }
})

axios.defaults.baseURL =
  'https://us-central1-socialapp-e0d9f.cloudfunctions.net/api';

if (localStorage.token) {
  const decodedToken = jwtDecode(localStorage.token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logOut())

  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = localStorage.token

    store.dispatch(getUserData())
  }
}
function App() {
  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Home} />
                <AuthRoute exact path='/login' component={Login} />
                <AuthRoute exact path='/signup' component={Signup} />
                <Route
                  exact
                  path="/users/:handle"
                  component={User}
                />
                <Route
                  exact
                  path="/users/:handle/scream/:screamId"
                  component={User}
                />

              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
