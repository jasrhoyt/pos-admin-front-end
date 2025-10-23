import {useSelector} from "react-redux";
import {selectUser} from "../../redux/selectors/userSelectors";
import {selectRestaurant} from "../../redux/selectors/restaurantSelectors";
import {useRestaurant} from "../../services/useRestaurant";
import {useEffect, useState} from "react";
import {Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {colors} from "../../themes/colors";
import {AddLocationAlt} from "@mui/icons-material";
import {UserSettingsDropdown} from "./UserSettingsDropdown";

export const DashboardHeader = ({ onAddNewRestaurant }:{ onAddNewRestaurant: () => void }) => {

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
    }, [onAddNewRestaurant]); // for a github test

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
            <Grid container spacing={2}>
                {/* First row: Select, Welcome text, and Settings - horizontally aligned */}
                <Grid
                    size={{ xs: 12, sm: 4, md: 3 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <FormControl sx={{ minWidth: '200px', marginRight: '1rem' }}>
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
                    <AddLocationAlt
                        sx={{
                            cursor: "pointer",
                            fontSize: "3rem"
                        }}
                        onClick={() => onAddNewRestaurant()}
                    />
                </Grid>

                <Grid
                    size={{ xs: 12, sm: 4, md: 8 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Typography variant="h3">
                        Welcome to PoS-Systems {user.firstName}!
                    </Typography>
                </Grid>

                <Grid
                    size={{ xs: 12, sm: 4, md: 1 }}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <UserSettingsDropdown />
                </Grid>

                {/* Second row: Restaurant name - full width, centered */}
                {/*<Grid*/}
                {/*    size={12}*/}
                {/*    display="flex"*/}
                {/*    justifyContent="center"*/}
                {/*    alignItems="center"*/}
                {/*    sx={{ marginTop: '1rem' }}*/}
                {/*>*/}
                {/*    <Typography*/}
                {/*        variant="h4"*/}
                {/*        sx={{*/}
                {/*            wordWrap: 'break-word',*/}
                {/*            overflowWrap: 'break-word',*/}
                {/*            hyphens: 'auto'*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {restaurant || user.companyName}*/}
                {/*    </Typography>*/}
                {/*</Grid>*/}
            </Grid>
        </Box>
    )
}