import './App.scss';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from './pages/login';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import Home from './pages/home';
import PrivateRoute from './component/router/privateRoute';

const MuiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#0198ff',
    },
    secondary: {
      light: '#69c8ff',
      main: '#0198ff',
      dark: '#006bcb',
    }
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={MuiTheme}>
        <CssBaseline/>
        <Switch>
          <Route exact path='/'>
            <Login/>
          </Route>
          <PrivateRoute exact path="/home">
            <Home/>
          </PrivateRoute>
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
