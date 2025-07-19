import {Stack, Box, TextField, Grid, Button, ThemeProvider, Link, Typography, FormControl} from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import backgroundImage from '../assets/pooches.jpg'
import { LoginTheme } from "../themes/LoginTheme";
import { useState } from "react";
import { useLogin } from "../services/useLogin";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from "../redux/slices/userSlices";
import {colors} from "../themes/colors";

export const Login = () => {

    const { login } = useLogin();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ email, setEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    const handleLogin = (userResponse: any) => {
        const { user_id, first_name, last_name, company_name, email, phone_number, address: { street_address, city, state, zipcode } } = userResponse;
        dispatch(
            setUser({
                userId: user_id,
                firstName: first_name,
                lastName: last_name,
                companyName: company_name,
                email,
                phoneNumber: phone_number,
                address: {
                    streetAddress: street_address,
                    city,
                    state,
                    zipcode,
                }

            })
        );
        navigate("/dashboard")
    }

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
                    <Stack spacing={2} sx={{ backgroundColor: colors.white, width: { sm: "70%", lg: "40%", xl: '25%'}, padding: "2rem", borderRadius: "8px" }}>
                        <FormControl fullWidth>
                            <TextField
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email"
                                value={email}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                label="Password"
                                type="password"
                                value={password}
                            />
                        </FormControl>
                        <Box sx={{ padding: "0 5rem" }}>
                            <Button onClick={async () => {
                                const response = await login(email, password);
                                if (response.detail) {
                                    setErrorMessage(response.detail);
                                } else {
                                    handleLogin(response);
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