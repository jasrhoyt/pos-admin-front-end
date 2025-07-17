import { DashboardTheme } from "../themes/DashboardTheme";
import {
    ThemeProvider,
    Box,
    Grid
} from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import { colors } from "../themes/colors";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/selectors/userSelectors";
import {useNavigate} from "react-router-dom";


export const Dashboard = () => {


    return (
        <ThemeProvider theme={DashboardTheme}>
            <DashboardHeader />
            <DashboardBody />
        </ThemeProvider>
    )
}

export const DashboardHeader = () => {

    const navigate = useNavigate();
    const user = useSelector(selectUser);
    return (
        <Box
            sx={{
                padding: "2rem",
                backgroundColor: colors.primaryColor,
            }}
        >
            <Grid spacing={1} container>
                <Grid size={11} display="flex" justifyContent="center" alignItems="center">
                    <Box>
                        Welcome to PoS-Systems!
                    </Box>
                </Grid>
                <Grid size={1} display="flex" justifyContent="center" alignItems="center">
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