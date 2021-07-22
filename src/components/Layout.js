import { makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutline, ExitToApp, SubjectOutlined } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {format} from 'date-fns';
import Avatar from '@material-ui/core/Avatar';
import { useContext } from "react";
import { UserContext } from "../context/user";
import Button from '@material-ui/core/Button';
import { logout } from '../services/auth';
import PleaseSignIn from '../pages/PleaseSignIn';
import { Link } from 'react-router-dom';

// import PleaseSignIn from '../pages/PleaseSignIn';
// import PleaseSignUp from './PleaseSignUp';

const drawerWidth = 240;



const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPaper: {
            width: drawerWidth
        },
        root: {
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        },
        button: {
            marginLeft: theme.spacing(2)
        }
    }
})

const Layout = ({ children }) => {

    const [user, setUser] = useContext(UserContext).user;

    const classes = useStyles();

    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutline color="secondary" />,
            path: '/create'
        }
    ]

    return (
        <div>
        {user? <div className={classes.root}>
            {/* app bar */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the { format(new Date(), 'do MMMM Y') }
                    </Typography>
                    <Typography>
                        {user ? user.displayName? user.displayName : user.email.replace("@gmail.com", "").toLowerCase() : ''}
                    </Typography>
                    {/* <Avatar src="/mario-av.png" className={classes.avatar}/> */}
                    {user ? <Avatar src={user.photoURL} className={classes.avatar}/> : <button>Sign In</button>}
                </Toolbar>
            </AppBar>

            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Ninja Notes
                    </Typography>
                </div>

                {/* list - links */}
                <List>
                    {menuItems.map(item => (
                        <ListItem
                            button 
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname == item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<ExitToApp />}
                    onClick={async () => {
                        await logout();
                        setUser(null);
                    }}
                >
                    Log Out
                </Button>
                </div>

            </Drawer>

            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
            
        </div> : history.push('/signin') }

        </div>
    );
}
 
export default Layout;