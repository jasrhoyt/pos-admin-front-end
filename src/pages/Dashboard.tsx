import { DashboardTheme } from "../themes/DashboardTheme";
import {
    ThemeProvider,
    Box,
} from "@mui/material";
import { useState} from "react";
import {AddRestaurantModal} from "../components/Modals/AddRestaurantModal";
import {DashboardHeader} from "../components/Dashboard/DashboardHeader";
import {DashboardBody} from "../components/Dashboard/DashboardBody";


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
