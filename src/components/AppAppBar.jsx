import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {ROUTE_PATHS} from "../routes/index.js";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../states/auth/authSlice.js";

function AppAppBar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated } = useSelector(state => state.auth);
    const [open, setOpen] = React.useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate(ROUTE_PATHS.HOME);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                boxSizing: 'border-box',
                padding: 0,
                margin: 0,
                boxShadow: 0,
                bgcolor: '#FADEFF',
                backgroundImage: 'none',
                pt: 1
            }}
        >
            <Container maxWidth="lg" sx={{ bgcolor: '#FADEFF'}}>
                <Toolbar
                    variant="regular"
                    sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        borderRadius: '999px',
                        bgcolor:
                            theme.palette.mode === 'light'
                                ? 'hsla(220, 60%, 99%, 0.6)'
                                : 'hsla(220, 0%, 0%, 0.7)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow:
                            theme.palette.mode === 'light'
                                ? '0 1px 2px hsla(210, 0%, 0%, 0.05), 0 2px 12px hsla(210, 100%, 80%, 0.5)'
                                : '0 1px 2px hsla(210, 0%, 0%, 0.5), 0 2px 12px hsla(210, 100%, 25%, 0.3)',
                    })}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            px: 0,
                        }}
                    >
                        {/*<Sitemark />*/}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Button sx={{
                                padding: '20px',
                                color: 'primary'
                            }}
                                variant="text"
                                color="info"
                                size="small"
                                onClick={() => {
                                    navigate(ROUTE_PATHS.HOME, { replace: true });
                                }}
                            >
                                Beranda
                            </Button>
                            <Button sx={{
                                padding: '20px'
                            }}
                                variant="text"
                                color="info"
                                size="small"
                                onClick={() => {
                                    navigate(ROUTE_PATHS.DISCUSSION, { replace: true });
                                }}
                            >
                                Forum Diskusi
                            </Button>
                            <Button sx={{
                                padding: '20px'
                            }}
                                variant="text"
                                color="info"
                                size="small"
                                onClick={() => {
                                    navigate(ROUTE_PATHS.REPORT, { replace: true });
                                }}
                            >
                                Pelaporan
                            </Button>
                            <Button sx={{
                                padding: '20px'
                            }}
                                variant="text"
                                color="info"
                                size="small"
                                onClick={() => {
                                    navigate(ROUTE_PATHS.ABOUT, { replace: true });
                                }}
                            >
                                Tentang
                            </Button>

                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            gap: 0.5,
                            alignItems: 'center',
                        }}
                    >
                        {isAuthenticated && (
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    handleLogout();
                                }}
                            >
                                Logout
                            </Button>
                        )}

                        {!isAuthenticated && (
                            <Button
                                color="primary"
                                variant="text"
                                size="small"
                                onClick={() => {
                                    navigate(ROUTE_PATHS.SIGN_IN, { replace: true });
                                }}
                            >
                                Sign in
                            </Button>
                        )}

                        {!isAuthenticated && (
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    navigate(ROUTE_PATHS.SIGN_UP, { replace: true });
                                }}
                            >
                                Sign up
                            </Button>
                        )}

                    </Box>
                    <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                            <Box
                                sx={{
                                    p: 2,
                                    backgroundColor: 'background.default',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon />
                                    </IconButton>
                                </Box>
                                <Divider sx={{ my: 3 }} />
                                <MenuItem
                                    onClick={() => {
                                        navigate(ROUTE_PATHS.HOME, { replace: true });
                                    }}
                                >
                                    Home
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        navigate(ROUTE_PATHS.DISCUSSION, { replace: true });
                                    }}
                                >
                                    Discussion
                                </MenuItem>
                                {isAuthenticated && (
                                    <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => {
                                                handleLogout();
                                            }}
                                        >
                                            Logout
                                        </Button>
                                    </MenuItem>
                                )}

                                {!isAuthenticated && (
                                    <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => {
                                                navigate(ROUTE_PATHS.SIGN_IN, { replace: true });
                                            }}
                                        >
                                            Sign in
                                        </Button>
                                    </MenuItem>
                                )}

                                {!isAuthenticated && (
                                    <MenuItem>
                                        <Button
                                            color="primary"
                                            variant="contained"
                                            fullWidth
                                            onClick={() => {
                                                navigate(ROUTE_PATHS.SIGN_UP, { replace: true });
                                            }}
                                        >
                                            Sign up
                                        </Button>
                                    </MenuItem>
                                )}
                            </Box>
                        </Drawer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default AppAppBar;
