import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { Box } from '@mui/material';
import { Grid } from '@material-ui/core';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import './Navbar.css';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let navigate = useNavigate();
    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(''));
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
        navigate('/login')
    }

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    var navbarComponent;

    if (token != "") {
        navbarComponent = <AppBar position="static">
            <Toolbar variant="dense" className='cor'>

            <LocalFloristIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Box className='cursor menuBar'>
                    <Typography variant="h5" color="inherit">
                        FABY BLOG
                    </Typography>
                </Box>
                <Typography variant="h6">
                    <Link to="/home" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            Home
                        </Box>
                    </Link>
                </Typography>
                <Typography variant="h6" >
                    <Link to="/posts" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            Postagens
                        </Box>
                    </Link>
                </Typography>
                <Typography variant="h6">
                    <Link to="/temas" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            Temas
                        </Box>
                    </Link>
                </Typography>
                <Typography variant="h6" className={classes.title}>
                    <Link to="/formularioTema" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            Cadastrar Tema
                        </Box>
                    </Link>
                </Typography>

                {auth && (
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle className='icon'/>
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
                            open={open}
                            onClose={handleClose}
                        >
                            <Link to='/perfil' className="text-decorator-none">
                                <Box mx={1} className='cursor'>
                                    <Typography variant="h6" color="inherit">
                                        <MenuItem onClick={handleClose}>Perfil</MenuItem>
                                    </Typography>
                                </Box>
                            </Link>
                            <Link to='/config' className="text-decorator-none">
                                <Box mx={1} className='cursor'>
                                    <Typography variant="h6" color="inherit">
                                        <MenuItem onClick={handleClose}>Configurações</MenuItem>
                                    </Typography>
                                </Box>
                            </Link>
                            <Box mx={1} className='cursor' onClick={goLogout}>
                                <Typography variant="h6" color="inherit">
                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                </Typography>
                            </Box>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;





/*
import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { addToken } from '../../../store/tokens/actions';
import { toast } from 'react-toastify';
import './Navbar.css';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function Navbar() {
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );
    let navigate = useNavigate();
    const dispatch = useDispatch();

    function goLogout() {
        dispatch(addToken(''));
        toast.info('Usuário deslogado', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress: undefined,
        });
        navigate('/login')
    }

    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event: any) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    var navbarComponent;

    if (token != "") {
        navbarComponent = <AppBar position="static">
            <Toolbar variant="dense" className='cor'>
                <LocalFloristIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                <Box className='cursor'>
                    <Typography variant="h5" color="inherit">
                        FABY BLOG
                    </Typography>
                </Box>

                <Box className='menuBar' display="flex" justifyContent="start">
                    <Link to="/home" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Home
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/posts" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Postagens
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/temas" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit">
                                Temas
                            </Typography>
                        </Box>
                    </Link>
                    <Link to="/formularioTema" className="text-decorator-none">
                        <Box mx={1} className='cursor'>
                            <Typography variant="h6" color="inherit" >
                                Cadastrar Tema
                            </Typography>
                        </Box>
                    </Link>
                </Box>

                {auth && (
                    <div className='iconButton'>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle className='icon'/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}

                            open={open}
                            onClose={handleClose}
                        >
                            <Link to='/perfil' className="text-decorator-none">
                                <Box mx={1} className='cursor'>
                                    <Typography variant="h6" color="inherit">
                                        <MenuItem onClick={handleClose}>Perfil</MenuItem>
                                    </Typography>
                                </Box>
                            </Link>
                            <Link to='/config' className="text-decorator-none">
                                <Box mx={1} className='cursor'>
                                    <Typography variant="h6" color="inherit">
                                        <MenuItem onClick={handleClose}>Configurações</MenuItem>
                                    </Typography>
                                </Box>
                            </Link>
                            <Box mx={1} className='cursor' onClick={goLogout}>
                                <Typography variant="h6" color="inherit">
                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                </Typography>
                            </Box>
                        </Menu>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    }
    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar;
*/