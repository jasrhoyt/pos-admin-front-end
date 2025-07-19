import {useState} from "react";
import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography} from "@mui/material";


export const RegisterCompanyInfo = (
    { streetAddress, setStreetAddress, city, setCity, state, setState, zipcode, setZipcode, phoneNumber, setPhoneNumber, stateOptions }:
    {
        streetAddress?: string,
        setStreetAddress: (inputString: string) => void,
        city?: string,
        setCity: (inputString: string) => void;
        state?: string;
        setState: (inputString: string) => void;
        zipcode?: string,
        setZipcode: (inputString: string) => void;
        phoneNumber?: string;
        setPhoneNumber: (inputString: string) => void;
        stateOptions: any[]
    }
) => {
    const [ isStateDropdownOpen, setIsStateDropdownOpen ] = useState(false);


    return (
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
    )
}