import {
    Modal,
    Stack,
    Box,
    Typography,
    Grid,
    FormControl,
    TextField,
    ThemeProvider,
    Checkbox, InputLabel, Select, MenuItem, Button
} from "@mui/material";
import {colors} from "../../themes/colors";
import {useEffect, useState} from "react";
import {ModalTheme} from "../../themes/ModalTheme";
import {useAdmin} from "../../services/useAdmin";
import {selectUser} from "../../redux/selectors/userSelectors";
import {useSelector} from "react-redux";
import {useRestaurant} from "../../services/useRestaurant";


export const AddRestaurantModal = ({ isOpen, onClose }:{ isOpen: boolean; onClose: () => void }) => {

    const [ restaurantName, setRestaurantName ] = useState<string>("");
    const [ email, setEmail ] = useState<string>("");
    const [ phoneNumber, setPhoneNumber ] = useState<string>("");
    const [ streetAddress, setStreetAddress ] = useState<string>("");
    const [ city, setCity ] = useState<string>("");
    const [ state, setState ] = useState<string>("");
    const [ zipcode, setZipcode ] = useState<string>("");

    const { getStates } = useAdmin()
    const { postRestaurants } = useRestaurant()
    const currentUser = useSelector(selectUser)
    const [ isStateDropdownOpen, setIsStateDropdownOpen ] = useState(false);
    const [ stateOptions, setStateOptions ] = useState<any[]>([]);
    const [ useParentCompanyName, setUseParentCompanyName ] = useState<boolean>(false);
    const [ useParentCompanyAddress, setUseParentCompanyAddress ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        (async () => {
            const states = await getStates();
            setStateOptions(states);
        })();
    }, []);

    const onAddRestaurantButtonClick = async () => {
        let address = null
        if (!useParentCompanyAddress) {
            address = {
                street_address: streetAddress,
                city: city,
                state: state,
                zipcode: zipcode,
            }
        }
        const response = await postRestaurants(
            restaurantName,
            useParentCompanyAddress,
            address
        );
    }

    return (
            <Modal open={isOpen} onClose={onClose}>
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
                        spacing={2}
                    >
                        <Box sx={{ display: "flex", justifyContent: "center"}}>
                            <Typography variant="h5">
                                Restaurant Information
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <FormControl>
                                <Checkbox
                                    checked={useParentCompanyName}
                                    onClick={() => {
                                        if (!useParentCompanyName) {
                                            setRestaurantName(currentUser.companyName)
                                            setEmail(currentUser.email)
                                        } else {
                                            setRestaurantName("");
                                            setEmail("")
                                        }
                                        setUseParentCompanyName(!useParentCompanyName)
                                    }}
                                />
                            </FormControl>
                            <Typography>Use Same Information as Parent Company</Typography>
                        </Box>
                        <Box>
                            <FormControl fullWidth>
                                <TextField
                                    label="Restaurant Name *"
                                    value={restaurantName}
                                    onChange={(e) => setRestaurantName(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl fullWidth>
                                <TextField
                                    label="Restaurant Email *"
                                    value={email}
                                    type='email'
                                    onChange={(e) => setStreetAddress(e.target.value)}
                                />
                            </FormControl>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center"}}>
                            <Typography variant="h5">
                                Contact Information
                            </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <FormControl>
                                <Checkbox
                                    checked={useParentCompanyAddress}
                                    onClick={() => {
                                        if (!useParentCompanyAddress) {
                                            setStreetAddress(currentUser.address.streetAddress);
                                            setCity(currentUser.address.city);
                                            setState(currentUser.address.state);
                                            setZipcode(currentUser.address.zipcode);
                                            setPhoneNumber(currentUser.phoneNumber);
                                        } else {
                                            setStreetAddress("");
                                            setCity("");
                                            setState("");
                                            setZipcode("");
                                            setPhoneNumber("");
                                        }
                                        setUseParentCompanyAddress(!useParentCompanyAddress);
                                    }}
                                />
                            </FormControl>
                            <Typography>Use Same Contact Information as Parent Company</Typography>
                        </Box>
                        <Box>
                            <FormControl fullWidth>
                                <TextField
                                    label="Street Address *"
                                    value={streetAddress}
                                    type='email'
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
                                        {isStateDropdownOpen && <InputLabel id="state-label">Select State</InputLabel>}

                                        <Select
                                            labelId="state-label"
                                            value={state || ''}
                                            onOpen={() => setIsStateDropdownOpen(true)}
                                            onClose={() => setIsStateDropdownOpen(false)}
                                            displayEmpty={!isStateDropdownOpen}

                                            label={isStateDropdownOpen ? "Select State" : undefined}
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
                                            MenuProps={{
                                                anchorOrigin: {
                                                    vertical: 'bottom',
                                                    horizontal: 'left', // where the menu is anchored from
                                                },
                                                transformOrigin: {
                                                    vertical: 'top',
                                                    horizontal: 'right', // where the menu grows towards
                                                },
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
                        <Box display="flex" justifyContent='center'>
                            <Button onClick={() => onAddRestaurantButtonClick()}>
                                Add New Restaurant
                            </Button>
                        </Box>
                        <Typography sx={{color: "red", display: "flex", justifyContent: "center"}}>{errorMessage}</Typography>
                    </Stack>
                </ThemeProvider>
            </Modal>
    )
}