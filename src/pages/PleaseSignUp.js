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
import { Link, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { signUpWithEmailPassword } from '../services/auth';
import { useContext } from "react";
import { UserContext } from "../context/user";
import Alert from '@material-ui/lab/Alert';

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

export default function PleaseSignUp() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [ , setUser ] = useContext(UserContext).user;
  const history = useHistory();

  const signUp = async (email, password) => {
    let userBySignUpwithEmailandPassword = await signUpWithEmailPassword(email, password);
    if(userBySignUpwithEmailandPassword) {
        // setUser(userBySignUpwithEmailandPassword);
        // console.log(userBySignUpwithEmailandPassword);
        localStorage.setItem('email', userBySignUpwithEmailandPassword.email);
        let data = {
          email:  localStorage.getItem('email')
        }
        setUser(data);
        history.push("/");
    }
    // return (
    //   <Alert severity="success">User Successfully Regsitered!</Alert>
    // )
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
      signUp(email, password);
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
                Sign Up
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
                    Sign Up
                </Button>
                <Grid container>
                    {/* <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid> */}
                    <Grid item>
                    <Link to="/signin" variant="body2">
                        {"Already have an account? Sign In"}
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