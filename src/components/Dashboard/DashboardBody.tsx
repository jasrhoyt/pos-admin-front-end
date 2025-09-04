import {Box} from "@mui/material";
import {colors} from "../../themes/colors";
import {NavBar} from "./NavBar";
import {DashboardContent} from "./DashboardContent";
import {MenuEnum} from "../../services/utilities";
import {useState} from "react";

export const DashboardBody = () => {

    const [ navbarIndex, setNavbarIndex ] = useState(MenuEnum.MENU);

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                backgroundColor: colors.secondaryColor,
            }}
        >
            <NavBar selectedIndex={navbarIndex} onNavClick={(itemIndex) => setNavbarIndex(itemIndex)} />
            <DashboardContent navbarIndex={navbarIndex} />
        </Box>
    )
}