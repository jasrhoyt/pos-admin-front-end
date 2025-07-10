import {
    Stack,
    Box,
    Grid,
    Button,
    FormControl,
    TextField,
    ThemeProvider,
    Typography,
    Select,
    InputLabel,
    MenuItem,
    Tooltip
} from "@mui/material";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import {useEffect, useState} from "react";
import {RegisterTheme} from "../themes/RegisterTheme";
import backgroundImage from "../assets/pooches.jpg";
import {useAdmin} from "../services/useAdmin";
import {useLogin} from "../services/useLogin";
import {useNavigate} from "react-router-dom";


export const Register = () => {

    const { getStates } = useAdmin()
    const { postAdmin } = useLogin();
    const navigate = useNavigate();

    const [ firstName, setFirstName ] = useState<string>("");
    const [ lastName, setLastName ] = useState<string>("");
    const [ companyName, setCompanyName ] = useState<string>("");
    const [ companyEmail, setCompanyEmail ] = useState<string>("");
    const [ password, setPassword ] = useState<string>("");
    const [ verifyPassword, setVerifyPassword ] = useState<string>("");
    const [ streetAddress, setStreetAddress ] = useState<string>("");
    const [ city, setCity ] = useState<string>("");
    const [ state, setState ] = useState<string>("");
    const [ zipcode, setZipcode ] = useState<string>("");
    const [ phoneNumber, setPhoneNumber ] = useState<string>("");

    const [ isStateDropdownOpen, setIsStateDropdownOpen ] = useState(false);
    const [ stateOptions, setStateOptions ] = useState<any[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        (async () => {
            const states = await getStates();
            setStateOptions(states);
        })();
    }, []);

    return (
        <ThemeProvider theme={RegisterTheme}>
            <Box
                sx={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    overflowY: "auto",
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Stack
                    spacing={4}
                    sx={{
                        backgroundColor: "white",
                        width: { sm: "70%", lg: "40%", xl: "25%" },
                        padding: "2rem",
                        borderRadius: "8px",
                    }}
                >
                    <Box>
                        <Stack spacing={2}>
                            <Typography variant="h5">
                                User Info
                            </Typography>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="First Name *"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Last Name *"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid size={11}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Company Name *"
                                                value={companyName}
                                                onChange={(e) => setCompanyName(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={1}>
                                        <Tooltip arrow title={<Typography>Address of the restaurant or parent company</Typography>}>
                                            <InfoOutlineIcon sx={{ fontSize: 28, cursor: 'pointer' }} />
                                        </Tooltip>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Company Email *"
                                        value={companyEmail}
                                        type='email'
                                        autoComplete="off"
                                        onChange={(e) => setCompanyEmail(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Password *"
                                                value={password}
                                                type="password"
                                                autoComplete="new-password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Verify Password *"
                                                value={verifyPassword}
                                                type="password"
                                                autoComplete="new-password"
                                                onChange={(e) => setVerifyPassword(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Box>
                    <Box>
                        <Stack spacing={2}>
                            <Typography variant="h5">
                                Company Address
                            </Typography>
                            <Box>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Street Address *"
                                        value={streetAddress}
                                        onChange={(e) => setStreetAddress(e.target.value)}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="City *"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            {isStateDropdownOpen && <InputLabel id="state-label">State</InputLabel>}

                                            <Select
                                                labelId="state-label"
                                                value={state || ''}
                                                onOpen={() => setIsStateDropdownOpen(true)}
                                                onClose={() => setIsStateDropdownOpen(false)}
                                                displayEmpty={!isStateDropdownOpen}
                                                label={isStateDropdownOpen ? "State" : undefined}
                                                renderValue={(selected) => {
                                                    if (!selected) {
                                                        return <Typography
                                                            sx={{
                                                                color: 'inherit !important', // or any specific color you want
                                                                display: 'flex',
                                                                justifyContent: 'flex-start',
                                                            }}
                                                        >
                                                            Select State *
                                                        </Typography>;
                                                    }
                                                    return selected;
                                                }}
                                            >
                                                {stateOptions.map((state: any, index: number) => {
                                                    return (
                                                        <MenuItem
                                                            key={`state-dropdown-item-${index}`}
                                                            onClick={(e) => setState(state.state_name)}
                                                        >
                                                            {state.state_name}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Zipcode *"
                                                value={zipcode}
                                                onChange={(e) => setZipcode(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Phone Number *"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Box>
                    <Box display="flex" justifyContent='center'>
                        <Button onClick={async () => {
                            const response = await postAdmin(
                                firstName,
                                lastName,
                                companyName,
                                companyEmail,
                                password,
                                streetAddress,
                                city,
                                state,
                                zipcode,
                                phoneNumber
                            );
                            if (response.detail) {
                                setErrorMessage(response.detail);
                            } else {
                                navigate("/dashboard");
                            }
                        }}>
                            Register for PoS-Systems
                        </Button>
                    </Box>
                    <Typography sx={{ color: "red", display: "flex", justifyContent: "center" }}>{errorMessage}</Typography>
                </Stack>
            </Box>
        </ThemeProvider>
    );
}