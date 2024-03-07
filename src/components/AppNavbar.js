import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import GamingHubLogo from '../assets/gaminghub.png';
import UserContext from '../UserContext';

const pagesAdmin = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/products' },
    { label: 'Profile', path: '/profile' },
    { label: 'Logout', path: '/logout' },
];

const pagesUser = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Cart', path: '/cart' },
    { label: 'Profile', path: '/profile' },
    { label: 'Logout', path: '/logout' },
];

const pagesNotLoggedIn = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'Sign In', path: '/login' },
];

export default function AppNavbar() {
    const { user } = useContext(UserContext);
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const renderPages = () => {
        if (user.isAdmin) {
            return pagesAdmin;
        } else if (user.id) {
            return pagesUser;
        } else {
            return pagesNotLoggedIn;
        }
    };

    return (
        <AppBar position="sticky" style={{ top: 0 }}>
            <Container maxWidth="xl" fluid>
                <Toolbar disableGutters>
                    <img src={GamingHubLogo} alt="Gaming Hub Logo" style={{ height: '70px', marginRight: '12px' }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Gaming Hub
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {renderPages().map((page) => (
                                <MenuItem key={page.label} onClick={handleCloseNavMenu} component={Link} to={page.path}>
                                    <Typography textAlign="center">{page.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: -8, display: { xs: 'none', md: 'flex' } }}>
                        {renderPages().map((page) => (
                            <Button
                                key={page.label}
                                onClick={handleCloseNavMenu}
                                sx={{ mx: 2, color: 'white', display: 'block' }}
                                component={Link}
                                to={page.path}
                            >
                                {page.label}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {renderPages().map((setting) => (
                                <MenuItem key={setting.label} onClick={handleCloseUserMenu} component={Link} to={setting.path}>
                                    <Typography textAlign="center">{setting.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
