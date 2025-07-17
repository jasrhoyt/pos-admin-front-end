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
import {clearUser, getUser} from "../redux/slices/userSlices";
import {useDispatch, useSelector} from "react-redux";
import {IUserState, selectUser} from "../redux/selectors/userSelectors";


export const Register = ({ isUserSettings = false }:{ isUserSettings?: boolean}) => {

    const [ user, setUser ] = useState<IUserState | undefined>()


    const { getStates } = useAdmin()
    const { postAdmin } = useLogin();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [ firstName, setFirstName ] = useState<string | undefined>("");
    const [ lastName, setLastName ] = useState<string | undefined>("");
    const [ companyName, setCompanyName ] = useState<string | undefined>("");
    const [ companyEmail, setCompanyEmail ] = useState<string | undefined>("");
    const [ password, setPassword ] = useState<string | undefined>("");
    const [ verifyPassword, setVerifyPassword ] = useState<string | undefined>("");
    const [ streetAddress, setStreetAddress ] = useState<string | undefined>("");
    const [ city, setCity ] = useState<string | undefined>("");
    const [ state, setState ] = useState<string | undefined>("");
    const [ zipcode, setZipcode ] = useState<string | undefined>("");
    const [ phoneNumber, setPhoneNumber ] = useState<string | undefined>("");

    const [ isStateDropdownOpen, setIsStateDropdownOpen ] = useState(false);
    const [ stateOptions, setStateOptions ] = useState<any[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const currentUser = useSelector(selectUser)

    const validate_password = (password?: string, verifiedPassword?: string) => {
        return password === verifiedPassword;
    }

    useEffect(() => {
        (async () => {
            const states = await getStates();
            setStateOptions(states);
        })();
    }, []);

    useEffect(() => {
        if (!isUserSettings) {
            dispatch(clearUser());
        }
        setUser(currentUser)
        setFirstName(currentUser.firstName)
        setLastName(currentUser.lastName)
        setCompanyName(currentUser.companyName)
        setCompanyEmail(currentUser.email)
        setStreetAddress(currentUser.address.streetAddress)
        setCity(currentUser.address.city)
        const state = stateOptions.find(
            (option) => option.state_name === currentUser.address.state
        )?.state_name
        setState(state)
        setZipcode(currentUser.address.zipcode)

    }, [stateOptions]);

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
                                                onChange={(e) => setFirstName(!!e.target.value ? e.target.value : undefined)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Last Name *"
                                                value={lastName}
                                                onChange={(e) => setLastName(!!e.target.value ? e.target.value : undefined)}
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
                                                onChange={(e) => setCompanyName(!!e.target.value ? e.target.value : undefined)}
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
                                        onChange={(e) => setCompanyEmail(!!e.target.value ? e.target.value : undefined)}
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
                                                onChange={(e) => setPassword(!!e.target.value ? e.target.value : undefined)}
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
                                                onChange={(e) => setVerifyPassword(!!e.target.value ? e.target.value : undefined)}
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
                                        onChange={(e) => setStreetAddress(!!e.target.value ? e.target.value : undefined)}
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
                                                onChange={(e) => setCity(!!e.target.value ? e.target.value : undefined)}
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
                                                onChange={(e) => setState(e.target.value)}
                                                renderValue={(selected) => {
                                                    if (!selected) {
                                                        return (
                                                            <Typography
                                                                sx={{
                                                                    color: 'inherit !important',
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-start',
                                                                }}
                                                            >
                                                                Select State *
                                                            </Typography>
                                                        );
                                                    }
                                                    return selected;
                                                }}
                                            >
                                                {stateOptions.map((state: any, index: number) => (
                                                    <MenuItem
                                                        key={`state-dropdown-item-${index}`}
                                                        value={state.state_name}
                                                    >
                                                        {state.state_name}
                                                    </MenuItem>
                                                ))}
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
                                                onChange={(e) => setZipcode(!!e.target.value ? e.target.value : undefined)}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid size={6}>
                                        <FormControl fullWidth>
                                            <TextField
                                                label="Phone Number *"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(!!e.target.value ? e.target.value : undefined)}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Box>
                    <Box display="flex" justifyContent='center'>
                        <Button onClick={async () => {
                            const isPasswordVerified = validate_password(password, verifyPassword)
                            if (!isPasswordVerified) {
                                setErrorMessage("Password and Verified Password must match!")
                            } else {
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
                                if (response.errorMessage) {
                                    setErrorMessage(response.errorMessage);
                                } else {
                                    navigate("/dashboard");
                                }
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