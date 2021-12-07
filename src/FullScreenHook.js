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

// import AsyncConnect from './AsyncConnect';

import WhitelistDictionary from './WhitelistDictionary';
import { contractAddr, contract } from './Contract';

import { ethers } from 'ethers';
import { parseEther } from '@ethersproject/units';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


function FullScreenHook() {

    const [mintAmount, setMintAmount] = useState(1);
    const [wallet, setWallet] = useState();
    const [web3, setWeb3] = useState();
    // const whitelist = WhitelistDictionary();

    const providerOptions = {
        injected: {
            package: null
        },
        walletconnect: {
            package: WalletConnectProvider,
            network: "ethereum",
            options: {
                infuraId: "bad8cc770bef49dc88683bf2290205c8" // required
            }
        }
    };

    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions
    });

    function compressedAddr(addr) {
        if (addr) {
            let first_account_chars = addr.substring(0, 5);
            let last_account_chars = addr.substring(addr.length - 4, addr.length);
            return first_account_chars + "..." + last_account_chars;
        }
    }

    async function connect() {
        try {
            let provider;
            provider = await web3Modal.connect();
            let web3 = new Web3(provider);
            setWeb3(web3);
            web3.eth.getAccounts().then(async (addr) => {
                setWallet(addr[0]);
            });
        } catch (e) {
            console.log(e);
            return;
        }
    }

    async function presaleMint() {
        const price = 0.09 * mintAmount;
        const mintable_price = price.toString();
        
        const tx = {
            from: wallet,
            to: contractAddr,
            value: ethers.utils.parseEther(mintable_price)["_hex"],
            data: contract.methods.mintMenaceWhitelist(mintAmount.toString()).encodeABI(),
        };

        const createTransaction = await web3.eth.sendTransaction(tx);

    }

    async function mint() {
        const price = 0.2 * mintAmount;
        const mintable_price = price.toString();

        const tx = {
            from: wallet,
            to: contractAddr,
            value: ethers.utils.parseEther(mintable_price)["_hex"],
            data: contract.methods.mintMenace(mintAmount.toString()).encodeABI(),
        };

        const createTransaction = await web3.eth.sendTransaction(tx);
    }

    function handleSlider(event, value) {
        event.preventDefault()
        setMintAmount(value)
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

    const Web3Button = styled(Button)({
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
                            { wallet &&
                            <Web3Button
                                fullWidth
                                variant="contained"
                                onClick={presaleMint}
                            >
                                Mint
                            </Web3Button>
                            } {!wallet &&
                            <Web3Button
                                fullWidth
                                variant="contained"
                                onClick={() => connect()}
                            >
                                Connect
                            </Web3Button>
                            }
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
                            {wallet &&
                                <>
                                    Connected Wallet: {compressedAddr(wallet)}
                                </>
                            } {!wallet &&
                                <>
                                    Please connect to your wallet.
                                </>
                            }
                                
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
                                Contract Address: {contractAddr}
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