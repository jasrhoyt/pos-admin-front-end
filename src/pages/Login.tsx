import { Stack, Box, TextField, Grid, Button, ThemeProvider, Link } from "@mui/material"
import backgroundImage from '../assets/pooches.jpg'
import { LoginTheme } from "../themes/LoginTheme";
import { useState } from "react";
import { useLogin } from "../services/useLogin";

export const Login = () => {

    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");

    const { login } = useLogin();

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
                    <Stack spacing={2} sx={{ backgroundColor: "white", width: '25%', padding: "2rem", borderRadius: 2 }}>
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
                            <Button onClick={ async () => await login(email, password)}>Login</Button>
                        </Box>
                        <Grid container spacing={2} justifyContent={'space-between'}>
                            <Grid>
                                <Link>Forgot Password?</Link>
                            </Grid>
                            <Grid>
                                <Link>Sign Up!</Link>
                            </Grid>
                        </Grid>
                    </Stack>
                </Box>
            </Stack>
        </ThemeProvider>

    )
}