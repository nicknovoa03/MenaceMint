import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import fs from 'fs'
import MintBackground from './MenaceSamples/MintBackground.jpg'

import AsyncConnect from './AsyncConnect';

function FullScreenHook() {

    const [wallet, menaceContract, menaceAddress, web3] = AsyncConnect();

    function handleWhitelist(event) {
        event.preventDefault();
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
        typography: {
            fontFamily: [
                'Open Sans',
                'Roboto'
            ].join(','),
        }
    });

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

    const WhitelistButton = styled(Button)({
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: 'grey',
        fontFamily: [
            'Roboto',
        ].join(','),
        '&:hover': {
            backgroundColor: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: 'rgba(255, 255, 255, 0.16)',
        },
        '&:active': {
            boxShadow: '#fff',
            backgroundColor: '#fff',
            borderColor: '#fff',
        }
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid
                container
                component="main"
                sx={{
                    height: '100vh',
                    backgroundImage: `url(${MintBackground})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'Transparent',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <CssBaseline />
                <Grid
                    item
                    container
                    direction="column"
                    alignItems="flex-end"
                    justify="flex-start"
                    sx={{
                        p: 4,
                        m: -2
                    }}
                >
                </Grid>
                <Grid
                    item
                    container
                    direction="column"
                    display="flex"
                    justify="center"
                >
                    <Container
                        sx={{
                            width: 500,
                            height: 250,
                            backgroundColor: '#121212',
                            marginTop: -10,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            borderRadius: 8,
                            opacity: [1, 1, .92],
                        }}
                    >
                        <Box
                            component="form"
                            noValidate
                            sx={{
                                mt: 1,
                            }}>
                            <Typography
                                component="h1"
                                variant="Title"
                                fontWeight="fontWeightBold"
                                color="White"
                                align="center"
                                display='flex'
                                justifyContent='center'
                            >
                                ADD WHITELIST WALLETS
                            </Typography>
                            <WhitelistButton
                                fullWidth
                                variant="contained"
                                type="submit"
                                onClick={(event) => handleWhitelist(event)}
                            >
                                Add To Whitelist
                            </WhitelistButton>
                            <Typography
                                component="h4"
                                variant="Subtitle"
                                color="White"
                                align="center"
                                display='flex'
                                justifyContent='center'
                                sx={{
                                    m: 1
                                }}
                            >
                                Connected Wallet: {wallet}
                            </Typography>
                            <Typography
                                component="h4"
                                variant="Subtitle"
                                color="White"
                                align="center"
                                display='flex'
                                justifyContent='center'
                                sx={{
                                    m: 1
                                }}
                            >
                                Contract Address: {menaceAddress}
                            </Typography>
                            <Copyright sx={{ mt: 1 }} />
                        </Box>
                    </Container>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default FullScreenHook;