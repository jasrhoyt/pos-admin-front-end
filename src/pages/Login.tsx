import {Stack, Box, TextField, Grid, Button, ThemeProvider, Link, Typography} from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import backgroundImage from '../assets/pooches.jpg'
import { LoginTheme } from "../themes/LoginTheme";
import { useState } from "react";
import { useLogin } from "../services/useLogin";
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const { login } = useLogin();
    const navigate = useNavigate();

    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const [ errorMessage, setErrorMessage ] = useState<string>();

    return (
        <ThemeProvider theme={LoginTheme}>
            <Stack
                sx={{ height: '100vh', width: '100vw' }}
            >
                <Box
                    sx={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        overflowY: "auto",
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Stack spacing={2} sx={{ backgroundColor: "white", width: { sm: "70%", lg: "40%", xl: '25%'}, padding: "2rem", borderRadius: "8px" }}>
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            label="Email"
                            value={email}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            value={password}
                        />
                        <Box sx={{ padding: "0 5rem" }}>
                            <Button onClick={async () => {
                                const response = await login(email, password);
                                if (response.detail) {
                                    setErrorMessage(response.detail);
                                } else {
                                    navigate("/dashboard");
                                }
                            }}>
                                Login
                            </Button>
                        </Box>
                        <Typography>{errorMessage}</Typography>
                        <Grid container spacing={2} justifyContent={'space-between'}>
                            <Grid>
                                <Link component={RouterLink} to="/reset-password">
                                    Forgot Password?
                                </Link>
                            </Grid>
                            <Grid>
                                <Link component={RouterLink} to="/register">
                                    Don’t have an account? Register here
                                </Link>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Stack>
        </ThemeProvider>

    )
}