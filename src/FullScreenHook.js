import { useState } from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import Slider from '@mui/material/Slider';
import MintBackground from './MenaceSamples/MintBackground.jpg'

import AsyncConnect from './AsyncConnect';

import WhitelistDictionary from './WhitelistDictionary'

function FullScreenHook() {

    const [wallet, menaceContract, menaceAddress, web3] = AsyncConnect();
    const [mintAmount, setMintAmount] = useState();
    const whitelist = WhitelistDictionary();

    async function presaleMint(mintAmount, wallet) {
        console.log("Mint ", mintAmount, " Menaces");
        var gasprice = await web3.eth.getGasPrice()
        var price = mintAmount * 99000000000000000;
        console.log("Price:", price)
        // call transfer function
        menaceContract.methods.mintMenace(mintAmount.toString()).send({ from: wallet, gasprice: 21000, value: price })
    }

    async function mint(mintAmount, wallet) {
        console.log("Mint ", mintAmount, " Menaces");
        var gasprice = await web3.eth.getGasPrice()
        console.log("Gas:", gasprice)
        var price = mintAmount * 200000000000000000;
        console.log("Price:", price)
        // call transfer function
        menaceContract.methods.mintMenace(mintAmount.toString()).send({ from: wallet, gas: 21000, value: price })
    }

    function handleSlider(event, value) {
        event.preventDefault()
        setMintAmount(value)
    }

    async function handleMint(event) {
        event.preventDefault();
        console.log('WALLET',wallet.toString())
        console.log('WHITELIST',whitelist)
        console.log("BOOL",whitelist[wallet])
        if (whitelist[wallet]){
            console.log("in whitelist",wallet)
            mint(mintAmount,wallet)
        }
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

    const MintButton = styled(Button)({
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
                            height: 280,
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
                                ENTER THE MENACE WORLD
                            </Typography>
                            <Slider
                                onChangeCommitted={(events, value) => handleSlider(events, value)}
                                aria-label="Mint Amount"
                                defaultValue={0}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={1}
                                max={5}
                                sx={{
                                    color: 'text.primary'
                                }}
                            />
                            <MintButton
                                fullWidth
                                variant="contained"
                                type="submit"
                                onClick={(event) => handleMint(event)}
                            >
                                Mint
                            </MintButton>
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