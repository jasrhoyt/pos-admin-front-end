import { Stack, Box, TextField, Grid, Button, ThemeProvider } from "@mui/material"
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
                        display: 'flex',                // Center content
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Stack spacing={2} sx={{ backgroundColor: "white", width: '25%', padding: "2rem", borderRadius: 2 }}>
                        <TextField
                            onChange={(e) => setEmail(e.target.value)}
                            label="Username"
                            value={email}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            label="Password"
                            type="password"
                            value={password}
                        />
                        <Grid>
                            <Button onClick={ async () => await login(email, password)}>Login</Button>
                            <Button>Forgot Password?</Button>
                        </Grid>
                    </Stack>
                </Box>
            </Stack>
        </ThemeProvider>

    )
}