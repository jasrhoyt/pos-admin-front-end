import {Box, Divider, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {colors} from "../../themes/colors";


export const NavBar = () => {
    return (

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
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}