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
    MenuItem, Tooltip
} from "@mui/material";
import InfoOutlineIcon from '@mui/icons-material/InfoOutline';
import {useState} from "react";
import {RegisterTheme} from "../themes/RegisterTheme";
import backgroundImage from "../assets/pooches.jpg";


export const Register = () => {

    const [ firstName, setFirstName ] = useState<string>();
    const [ lastName, setLastName ] = useState<string>();
    const [ companyName, setCompanyName ] = useState<string>();
    const [ streetAddress, setStreetAddress ] = useState<string>();
    const [ city, setCity ] = useState<string>();
    const [ state, setState ] = useState<string>();
    const [ zipcode, setZipcode ] = useState<string>();
    const [ phoneNumber, setPhoneNumber ] = useState<string>();
    const [ isStateDropdownOpen, setIsStateDropdownOpen ] = useState(false);

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
                    <Typography variant="h5" component="div">
                        User Info
                    </Typography>

                    <Box>
                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="First Name"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={6}>
                                <FormControl fullWidth>
                                    <TextField
                                        label="Last Name"
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
                                        label="Company Name"
                                        value={companyName}
                                        onChange={(e) => setCompanyName(e.target.value)}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid size={1}>
                                <Tooltip arrow title={<Typography>"Address of the restaurant or parent company"</Typography>}>
                                    <InfoOutlineIcon sx={{ fontSize: 28, cursor: 'pointer' }} />
                                </Tooltip>
                            </Grid>
                        </Grid>

                    </Box>

                    <Typography variant="h5" component="div">
                        Company Address
                    </Typography>

                    <Box>
                        <FormControl fullWidth>
                            <TextField
                                label="Street Address"
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
                                        label="City"
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
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        onOpen={() => setIsStateDropdownOpen(true)}
                                        onClose={() => setIsStateDropdownOpen(false)}
                                        displayEmpty
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
                                                    Select State
                                                </Typography>;
                                            }
                                            return selected;
                                        }}
                                    >
                                        <MenuItem value="NY">New York</MenuItem>
                                        <MenuItem value="CA">California</MenuItem>
                                        <MenuItem value="TX">Texas</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Zipcode"
                                            value={zipcode}
                                            onChange={(e) => setZipcode(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid size={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Phone Number"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Stack>
            </Box>
        </ThemeProvider>
    );
}