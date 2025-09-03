import { DashboardTheme } from "../themes/DashboardTheme";
import {
    ThemeProvider,
    Box,
    Grid, Typography, InputLabel, Select, MenuItem, FormControl, List, ListItemButton, ListItem, ListItemText, Divider
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
import {UserSettingsDropdown} from "../components/Dashboard/UserSettingsDropdown";


export const Dashboard = () => {

    const [ isAddRestaurantModalOpen, setAddRestaurantModalOpen ] = useState(false);

    return (
        <ThemeProvider theme={DashboardTheme}>
            <Box sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column"
            }}>
                <AddRestaurantModal isOpen={isAddRestaurantModalOpen} onClose={() => {
                    setAddRestaurantModalOpen(false)
                }} />
                <DashboardHeader onAddNewRestaurant={() => {
                    setAddRestaurantModalOpen(true)
                }} />
                <DashboardBody />
            </Box>
        </ThemeProvider>
    )
}

export const DashboardHeader = ({ onAddNewRestaurant }:{ onAddNewRestaurant: () => void }) => {

    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const currentRestaurant = useSelector(selectRestaurant);
    const { getRestaurants } = useRestaurant();

    const [ isRestaurantDropdownOpen, setIsRestaurantDropdownOpen ] = useState(false);
    const [ isUserSettingsDropdownOpen, setIsUserSettingsDropdownOpen ] = useState(false);

    const [ restaurant, setRestaurant ] = useState<string>("")

    const [ restaurantOptions, setRestaurantOptions] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const restaurants = await getRestaurants(user.userId);
            setRestaurantOptions(restaurants);
        })();
    }, [onAddNewRestaurant]);

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
                <Grid size={2.5} display="flex" justifyContent="center" alignItems="center">
                    <FormControl fullWidth>
                        {isRestaurantDropdownOpen &&
                            <InputLabel id="restaurant-label">Select Restaurant</InputLabel>
                        }
                        <Select
                            labelId="restaurant-label"
                            value={restaurant || ''}
                            onOpen={() => {
                                setIsRestaurantDropdownOpen(true)
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
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                width: '100%',
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
                        <Typography
                            variant="h4"
                            sx={{
                                wordWrap: 'break-word',
                                overflowWrap: 'break-word',
                                hyphens: 'auto'
                            }}
                        >
                            {restaurant || user.companyName}
                        </Typography>
                    </Box>
                </Grid>
                <UserSettingsDropdown />
            </Grid>
        </Box>
    )
}

export const DashboardBody = () => {

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                backgroundColor: colors.secondaryColor,
            }}
        >
            <Box
                sx={{
                    width: "15%",
                    backgroundColor: colors.tertiaryColor,
                    borderRight: 1,
                    borderColor: "divider",
                }}
            >
                <List component="nav" sx={{ p: 0 }}>
                    <ListItem disablePadding>
                        <ListItemButton
                            // onClick={() => handleNavClick('Menu')}
                            sx={{
                                py: 2,
                                px: 3,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemText
                                primary="Menu"
                                primaryTypographyProps={{
                                    variant: 'body1',
                                    fontWeight: 'medium',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton
                            // onClick={() => handleNavClick('Reports')}
                            sx={{
                                py: 2,
                                px: 3,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemText
                                primary="Reports"
                                primaryTypographyProps={{
                                    variant: 'body1',
                                    fontWeight: 'medium',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <Divider />

                    <ListItem disablePadding>
                        <ListItemButton
                            // onClick={() => handleNavClick('Employees')}
                            sx={{
                                py: 2,
                                px: 3,
                                '&:hover': {
                                    backgroundColor: 'action.hover',
                                },
                            }}
                        >
                            <ListItemText
                                primary="Employees"
                                primaryTypographyProps={{
                                    variant: 'body1',
                                    fontWeight: 'medium',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>

            {/* Main Content Area */}
            <Box
                sx={{
                    flex: 1,
                    padding: 4,
                    overflow: "auto",
                }}
            >
                {/*{renderContent()}*/}
            </Box>
        </Box>
    )
}