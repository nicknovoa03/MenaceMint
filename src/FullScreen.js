import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Slider from '@mui/material/Slider';
import MintBackground from './MenaceSamples/MintBackground.jpg'
import getWeb3 from './GetWeb3'
import { Component } from 'react';
import Pixatar from './contracts/Pixatar.json'
//import Menace from './contracts/Menace.json'

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

class FullScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            accounts: [],
            contract: null,
            pixatars: []
        }
    }
    
    async componentDidMount(){
        await this.connectWeb3()
    }
    async connectWeb3(){
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            console.log("accounts:", accounts);

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            console.log("network:", networkId);
            const deployedNetwork = Pixatar.networks[networkId];
            const contract = new web3.eth.Contract(
                Pixatar.abi,
                deployedNetwork && deployedNetwork.address,
            );
            console.log("contract:", contract)

            // Set accounts, contract, and total supply to the state
            this.setState({ accounts: accounts, contract: contract});
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    }

    mint = (pixatar) => {
        console.log(pixatar)
        this.state.contract.methods.mint(pixatar).send({ from: this.state.accounts[0] })
            .once('receipt', (receipt) => {
                this.setState({
                    pixatars: [...this.state.pixatars, pixatar]
                })
            })
    }

    render() {
        return (
            <ThemeProvider theme={darkTheme}>
                <Grid container component="main"
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
                        <Fab
                            sx={{ my: 4, bgcolor: 'palette.action.active' }}
                            variant="circular"
                            size="Medium"
                            >
                            <AccountBalanceWalletIcon />
                        </Fab>
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
                                height: 230,
                                backgroundColor: '#121212',
                                marginTop: -13,
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
                                    aria-label="Mint Amount"
                                    defaultValue={0}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={0}
                                    max={2}
                                    sx={{
                                        color: 'text.primary'
                                    }}
                                />
                                <MintButton
                                    fullWidth
                                    variant="contained"
                                    onClick={console.log('#329833')}
                                >
                                    Mint
                                </MintButton>
                                <Typography
                                    component="h4"
                                    variant="Subtitle"
                                    fontWeight="light"
                                    color="White"
                                    align="center"
                                    display='flex'
                                    justifyContent='center'
                                    sx={{
                                        m: 1
                                    }}
                                >
                                    Connected Wallet: {this.state.accounts}
                                </Typography>
                                <Copyright sx={{ mt: 1 }} />
                            </Box>
                        </Container>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default FullScreen;