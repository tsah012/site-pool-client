import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import { LOGOUT, LOGGED_OUT, LOGOUT_FAILURE } from '../../actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import applogo from '../../static/images/app-logo.png';


const drawerWidth = 150;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const appBarColor = process.env.REACT_APP_THEME_COLOR;
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoCSS = { maxWidth: '5%', paddingTop: '1%' };

    const performLogout = async () => {
        try {
            dispatch({ type: LOGOUT });

            // HERE WE CALL LOGOUT API:
            const response = await axios.delete(process.env.REACT_APP_API_SERVER_END_POINT + '/logout', { withCredentials: true });
            if (response.data.status) {
                dispatch({ type: LOGGED_OUT });
                navigate('/login')
            }
        } catch (error) {
            console.log('error during logging out: ' + error);
            dispatch({ type: LOGOUT_FAILURE, payload: error });
        }
    }

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    if (auth.isLogged) {
        return (
            <Box>
                <CssBaseline />
                <AppBar open={open} sx={{ position: 'static', backgroundColor: appBarColor }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            <Link to='/'>
                                <img src={applogo} alt="AppLogo" style={logoCSS} />
                            </Link>
                        </Typography>
                        {auth.isLogged && (
                            <div style={{ marginLeft: 'auto' }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenMenu}
                                    color="inherit"
                                >
                                    <AccountCircleIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleCloseMenu}
                                >
                                    <Link to='/personalinfo' style={{ textDecoration: 'none', color: 'black' }}>
                                        <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                                    </Link>
                                    <MenuItem onClick={() => {
                                        handleCloseMenu();
                                        performLogout();
                                    }}>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        justifyContent: 'space-between'
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >

                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>

                    <List>
                        <Link to='/sites/google' style={{ textDecoration: 'none', color: 'black' }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        {/* <someIcon /> */}
                                    </ListItemIcon>
                                    <ListItemText primary={'Google'} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </List>

                    {/* Bottom of drawer */}

                    <List sx={{ display: "contents" }}>
                        <ListItem disablePadding sx={{ marginTop: "auto" }}>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <InboxIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={'About'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {/* <InboxIcon /> */}
                                </ListItemIcon>
                                <ListItemText primary={'Contact Us'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
            </Box>
        )
    }
    else {
        return (<></>)
    }
}
