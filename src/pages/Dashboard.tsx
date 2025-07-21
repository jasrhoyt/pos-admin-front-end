import { DashboardTheme } from "../themes/DashboardTheme";
import {
    ThemeProvider,
    Box,
    Grid, Typography, InputLabel, Select, MenuItem, FormControl
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { colors } from "../themes/colors";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/selectors/userSelectors";
import { selectRestaurant } from "../redux/selectors/restaurantSelector";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import { AddLocationAlt } from "@mui/icons-material";
import {AddRestaurantModal} from "../components/Modals/AddRestaurantModal";
import {useRestaurant} from "../services/useRestaurant";


export const Dashboard = () => {

    const [ isAddRestaurantModalOpen, setAddRestaurantModalOpen ] = useState(false);

    return (
        <ThemeProvider theme={DashboardTheme}>
            <AddRestaurantModal isOpen={isAddRestaurantModalOpen} onClose={() => {
                setAddRestaurantModalOpen(false)
            }} />
            <DashboardHeader onAddNewRestaurant={() => {
                setAddRestaurantModalOpen(true)
            }} />
            <DashboardBody />
        </ThemeProvider>
    )
}

export const DashboardHeader = ({ onAddNewRestaurant }:{ onAddNewRestaurant: () => void }) => {

    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const currentRestaurant = useSelector(selectRestaurant);
    const { getRestaurants } = useRestaurant();

    const [ isRestaurantDropdownOpen, setIsRestaurantDropdownOpen ] = useState(false);
    const [ restaurant, setRestaurant ] = useState<string>("")

    const [ restaurantOptions, setRestaurantOptions] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const restaurants = await getRestaurants(user.userId);
            setRestaurantOptions(restaurants);
        })();
    }, []);

    useEffect(() => {
        if (currentRestaurant.restaurantName) {
            setRestaurant(currentRestaurant.restaurantName)
        } else if (!currentRestaurant.restaurantName && restaurantOptions.length > 0) {
            setRestaurant(restaurantOptions[0]?.restaurantName);
        }
    }, [restaurantOptions, currentRestaurant]);

    return (
        <Box
            sx={{
                padding: "2rem",
                backgroundColor: colors.primaryColor,
            }}
        >
            <Grid spacing={1} container>
                <Grid size={2} display="flex" justifyContent="center" alignItems="center">
                    <FormControl fullWidth>
                        {isRestaurantDropdownOpen && <InputLabel id="restaurant-label">Select Restaurant</InputLabel>}

                        <Select
                            labelId="restaurant-label"
                            value={restaurant || ''}
                            onOpen={() => {
                                if (restaurantOptions.length > 1) {
                                    setIsRestaurantDropdownOpen(true)
                                }
                            }}
                            disabled={restaurantOptions.length < 2}
                            onClose={() => setIsRestaurantDropdownOpen(false)}
                            displayEmpty={!isRestaurantDropdownOpen}
                            label={isRestaurantDropdownOpen ? "Select Restaurant" : undefined}
                            onChange={(e) => {
                                setRestaurant(e.target.value)
                            }}
                            renderValue={(selected) => {
                                if (!selected) {
                                    return (
                                        <Typography
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-start',
                                            }}
                                        >
                                            Select Restaurant
                                        </Typography>
                                    );
                                }
                                return selected;
                            }}
                        >
                            {restaurantOptions.map((restaurant: any, index: number) => (
                                <MenuItem
                                    key={`restaurant-dropdown-item-${index}`}
                                    value={restaurant.restaurantName}
                                >
                                    {restaurant.restaurantName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <AddLocationAlt sx={{ paddingLeft: "1rem", cursor: "pointer", fontSize: "3rem" }} onClick={() => onAddNewRestaurant()}/>
                </Grid>
                <Grid size={8} display="flex" justifyContent="center" alignItems="center">
                    <Box>
                        <Typography variant="h2">
                            Welcome to PoS-Systems {user.firstName}!
                        </Typography>
                        <Typography variant="h4">
                            {restaurant || user.companyName}
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={2} display="flex" justifyContent="center" alignItems="center">
                    <SettingsIcon sx={{ cursor: "pointer", fontSize: "3rem" }} onClick={() => navigate("/settings")} />
                </Grid>
            </Grid>
        </Box>
    )
}

export const DashboardBody = () => {

    return (
        <Box
            sx={{
                height: "100vh",
                padding: "2rem",
                backgroundColor: colors.secondaryColor
            }}
        >
        </Box>
    )
}