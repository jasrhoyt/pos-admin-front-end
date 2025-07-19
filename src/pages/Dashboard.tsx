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
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { AddLocationAlt } from "@mui/icons-material";
import {AddRestaurantModal} from "../components/AddRestaurantModal";


export const Dashboard = () => {


    return (
        <ThemeProvider theme={DashboardTheme}>
            <AddRestaurantModal />
            <DashboardHeader />
            <DashboardBody />
        </ThemeProvider>
    )
}

export const DashboardHeader = () => {

    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const [ isRestaurantDropdownOpen, setIsRestaurantDropdownOpen ] = useState(false);
    const [ restaurant, setRestaurant ] = useState<string | undefined>("")

    const restaurants: any = []

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
                        {isRestaurantDropdownOpen && <InputLabel id="state-label">Select Restaurant</InputLabel>}

                        <Select
                            labelId="state-label"
                            value={restaurant || ''}
                            onOpen={() => setIsRestaurantDropdownOpen(true)}
                            onClose={() => setIsRestaurantDropdownOpen(false)}
                            displayEmpty={!isRestaurantDropdownOpen}
                            label={isRestaurantDropdownOpen ? "Restaurants" : undefined}
                            onChange={(e) => setRestaurant(e.target.value)}
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
                                            Select Restaurant
                                        </Typography>
                                    );
                                }
                                return selected;
                            }}
                        >
                            {restaurants.map((restaurant: any, index: number) => (
                                <MenuItem
                                    key={`state-dropdown-item-${index}`}
                                    value={restaurant.resaurant_name}
                                >
                                    {restaurant.restaurant_name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <AddLocationAlt sx={{ paddingLeft: "1rem", fontSize: "3rem" }}/>
                </Grid>
                <Grid size={8} display="flex" justifyContent="center" alignItems="center">
                    <Box>
                        <Typography variant="h2">
                            Welcome to PoS-Systems {user.firstName}!
                        </Typography>
                        <Typography variant="h4">
                            Restaurant Name Placeholder
                        </Typography>
                    </Box>
                </Grid>
                <Grid size={2} display="flex" justifyContent="center" alignItems="center">
                    <SettingsIcon sx={{ cursor: "pointer" }} onClick={() => navigate("/settings")} />
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