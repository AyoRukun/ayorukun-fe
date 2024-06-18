import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Card as MuiCard } from '@mui/material';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes/index.jsx';
import { login } from '../states/auth/authSlice';
import useStringInput from '../hooks/useInput';
import { toastError } from '../utils/toast.js';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  gap: theme.spacing(4),
  width: '100%',
  padding: theme.spacing(2),
  boxShadow:
        theme.palette.mode === 'light'
          ? 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px'
          : 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px, hsla(220, 30%, 5%, 0.05) 0px 0px 0px 1px',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    width: '450px',
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'auto',
  padingBottom: theme.spacing(12),
  backgroundImage:
        theme.palette.mode === 'light'
          ? 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))'
          : 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.3), hsl(220, 30%, 5%))',
  backgroundRepeat: 'no-repeat',
  [theme.breakpoints.up('sm')]: {
    paddingBottom: 0,
    height: '100dvh',
  },
}));

export default function SignIn() {
  const [email, setEmail] = useStringInput();
  const [password, setPassword] = useStringInput();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const theme = createTheme({ palette: 'light' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function clearError() {
    setPasswordError('');
    setEmailError('');
  }

  function isInputValidated() {
    clearError();
    let hasError;
    if (!email) {
      setPasswordError('Email is required!');
      hasError = true;
    }

    if (!password) {
      setPasswordError('Password is required!');
      hasError = true;
    }

    return !hasError;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isInputValidated()) return;

    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        navigate(ROUTE_PATHS.HOME);
      })
      .catch((error) => {
        toastError(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SignInContainer direction="column" justifyContent="space-between">
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            position: { xs: 'static', sm: 'fixed' },
            width: '100%',
            p: { xs: 2, sm: 4 },
          }}
        />
        <Stack
          justifyContent="center"
          sx={{ height: { xs: '100%', sm: '100dvh' }, p: 2 }}
        >
          <Card>
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={!!emailError}
                  helperText={emailError}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'email' }}
                  value={email}
                  onChange={setEmail}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <TextField
                  error={!!passwordError}
                  helperText={passwordError}
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={passwordError ? 'error' : 'primary'}
                  value={password}
                  onChange={setPassword}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
              >
                Sign in
              </Button>
              <Link
                href={ROUTE_PATHS.SIGN_UP}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Don&apos;t have an account? Sign up
              </Link>
            </Box>
          </Card>
        </Stack>
      </SignInContainer>
    </ThemeProvider>
  );
}
