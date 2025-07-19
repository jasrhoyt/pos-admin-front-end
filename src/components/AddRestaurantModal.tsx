import {Modal, Stack, Box, Typography, Grid, FormControl, TextField, Tooltip, ThemeProvider} from "@mui/material";
import {colors} from "../themes/colors";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { useState } from "react";
import {ModalTheme} from "../themes/ModalTheme";


export const AddRestaurantModal = () => {

    const [ restaurantName, setRestaurantName ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ phoneNumber, setPhoneNumber ] = useState<string>("");
    const [ streetAddress, setStreetAddress ] = useState<string>("");
    const [ city, setCity ] = useState<string>("");
    const [ state, setState ] = useState<string>("");
    const [ zipcode, setZipcode ] = useState<string>("");

    return (
            <Modal open={true}>

                <ThemeProvider theme={ModalTheme}>
                    <Stack
                        sx={{
                            backgroundColor: colors.secondaryColor,
                            padding: "2rem",
                            borderRadius: "1rem",
                            boxShadow: 16,
                            width: "100%",
                            outline: 'none',
                            '&:focus': {
                                outline: 'none'
                            }
                        }}
                        spacing={4}
                    >
                        <Typography variant="h5">
                            User Info
                        </Typography>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Phone Number *"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid size={6}>
                                    <FormControl fullWidth>
                                        <TextField
                                            label="Restaurant Email *"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
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
                                            label="Restaurant Name *"
                                            value={restaurantName}
                                            onChange={(e) => setRestaurantName(e.target.value)}
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
                                    label="Street Address *"
                                    value={streetAddress}
                                    type='email'
                                    autoComplete="off"
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
                                        <TextField
                                            label="State *"
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Box>
                    </Stack>
                </ThemeProvider>
            </Modal>
    )
}