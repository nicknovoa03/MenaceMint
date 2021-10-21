import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Slider from '@mui/material/Slider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import HttpsIcon from '@mui/icons-material/Https';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import menacePng from './MenaceSamples/1.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.menace.world/">
        Menace World
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function valueText(value){
    return `${value}`;
}
export default function MenaceMint() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('Menace Amount'),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: menacePng,
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'Transparent',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} sx={{backgroundColor:'Grey'}} Square>
            <Box
                sx={{
                my: 2,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Fab sx={{ my:4 }} variant="extended" size="Medium" color="Black" aria-label="add">
                    <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                    Connect Wallet
                </Fab>
                <Avatar sx={{ m:2, bgcolor: 'Black' }}>
                    <HttpsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Mint Menace
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Slider
                    aria-label="Mint Amount"
                    defaultValue={0}
                    getAriaValueText={valueText}
                    valueLabelDisplay="auto"
                    step={1}
                    marks
                    min={0}
                    max={2}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    >
                    Mint
                </Button>
                <Copyright sx={{ mt: 1 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}