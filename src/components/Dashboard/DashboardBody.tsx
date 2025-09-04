import {Box} from "@mui/material";
import {colors} from "../../themes/colors";
import {NavBar} from "./NavBar";
import {DashboardContent} from "./DashboardContent";

export const DashboardBody = () => {

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                backgroundColor: colors.secondaryColor,
            }}
        >
            <NavBar />
            <DashboardContent />
        </Box>
    )
}