import {Box, Stack} from "@mui/material";
import {AddCategoryButton} from "../../AddCategoryButton";
import {useMenu} from "../../../../services/useMenu";
import {useEffect} from "react";
import {useRestaurant} from "../../../../services/useRestaurant";


export const MenuCategories = () => {

    const { getMenu } = useMenu();
    const { getRestaurants } = useRestaurant();

    useEffect(() => {
        (async () => {
            const restaurants = await getMenu(user.userId);
            setRestaurantOptions(restaurants);
        })();
    }, [onAddNewRestaurant]);
    console.log('test value:', )

    return (
        <Stack spacing={1}>
            <Box>
                <AddCategoryButton />
            </Box>
            <Box>
                {}
            </Box>
        </Stack>
    )
}