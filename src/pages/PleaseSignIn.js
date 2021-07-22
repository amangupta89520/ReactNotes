import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, useHistory } from 'react-router-dom';
import { sendPasswordReset, signInWithEmailPassword } from '../services/auth';
import { useContext } from "react";
import { UserContext } from "../context/user";
import Alert from '@material-ui/lab/Alert';
import { signInWithGoogle } from "../services/auth";
import SvgIcon from '@material-ui/icons/LockOutlined';
import {FcGoogle} from 'react-icons/fc'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        React Notes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  field: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3)
  }
}));

export default function PleaseSignIn() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [ , setUser ] = useContext(UserContext).user;
  const history = useHistory();

  const signIn = async (email, password) => {
    let userBySignInwithEmailandPassword = await signInWithEmailPassword(email, password);
    if(userBySignInwithEmailandPassword) {
        // setUser(userBySignInwithEmailandPassword);
        // console.log(userBySignInwithEmailandPassword);
        localStorage.setItem('email', userBySignInwithEmailandPassword.email);
        let data = {
          email:  localStorage.getItem('email')
        }
        setUser(data);
        // console.log(localStorage.getItem('email'))
        history.push("/");
    }
    // return (
    //   <Alert severity="success">Problem signing in!</Alert>
    // )
}

const signInGoogle = async () => {
  let userBySignIn = await signInWithGoogle();
  if(userBySignIn) {
      // setUser(userBySignIn);
      // console.log(userBySignIn);
      localStorage.setItem('email', userBySignIn.email);
      localStorage.setItem('displayName', userBySignIn.displayName);
      localStorage.setItem('photoURL', userBySignIn.photoURL)
      let data = {
        email:  localStorage.getItem('email'),
        displayName: localStorage.getItem('displayName'),
        photoURL: localStorage.getItem('photoURL')
      }
      setUser(data);
      history.push("/");
  }
}

const handleSubmit = (e) => {
  e.preventDefault();

  setEmailError(false);
  setPasswordError(false);

  if(email=='') {
    setEmailError(true);
  }
  if(password=='') {
    setPasswordError(true);
  }

  if(email && password) {
    signIn(email, password);
  }
}




  return (
      <div>
            <AppBar
                elevation={0}
            >
                <Toolbar>
                    <Typography variant="h6">
                        React Notes
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <TextField
                    onChange={(e) => setEmail(e.target.value)}
                    className={classes.field} 
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    required
                    error={emailError}
                />
                <TextField
                    onChange={(e) => setPassword(e.target.value)}
                    // className={classes.field} 
                    label="Password"
                    variant="outlined"
                    color="secondary"
                    type="password"
                    fullWidth
                    required
                    error={passwordError}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={signInGoogle}
                    startIcon={<FcGoogle />}
                >
                    Sign In With Google
                </Button>
                <Grid container>
                    <Grid item xs>
                    {/* <Link to='/signup'>Sign Up</Link> */}
                    <Link to="/signup">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            </Container>
    </div>
  );
}