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

function valueText(value) {
    return `${value}`;
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

export default function FullScreen() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        console.log({
            email: data.get('Menace Amount'),
        });
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    sx={{
                        backgroundImage: `url(${MintBackground})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: 'Transparent',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Container
                        component="main"
                        maxWidth="xs"
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Fab sx={{ my: 4, bgcolor: 'palette.action.active' }} variant="extended" size="Medium">
                                <AccountBalanceWalletIcon sx={{ mr: 1 }} />
                                Connect Wallet
                            </Fab>
                            <Typography component="h1" variant="Title" fontWeight="fontWeightBold" color="White">
                                MINT MENACE
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
                                    sx={{
                                        color: 'text.primary'
                                    }}
                                />
                                <MintButton
                                    fullWidth
                                    variant="contained"
                                >
                                    Mint
                                </MintButton>
                                <Copyright sx={{ mt: 1 }} />
                            </Box>
                        </Box>
                    </Container>
                </Grid>

            </Grid>
        </ThemeProvider>
    );
}