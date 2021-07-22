import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'
// import Layout from './components/Layout'
import Login from './pages/Login'
import { UserContextProvider } from "./context/user";
import PleaseSignUp from './pages/PleaseSignUp'
import PleaseSignIn from './pages/PleaseSignIn'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  return (

    <ThemeProvider theme={theme}>
      <Router>
      <UserContextProvider>
        {/* <Layout> */}
          <Switch>
            <Route exact path="/">
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/signin">
              <PleaseSignIn />
            </Route>
            <Route path="/signup">
              <PleaseSignUp />
            </Route>
          </Switch>
        {/* </Layout> */}
        {/* <Switch>
          <Route path="/signin">
              <PleaseSignIn />
          </Route>
          <Route path="/signup">
              <PleaseSignUp />
          </Route>
        </Switch> */}
        </UserContextProvider>
      </Router>
    </ThemeProvider>

  );
}

export default App;
