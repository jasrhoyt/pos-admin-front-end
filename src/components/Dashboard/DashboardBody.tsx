import {Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {colors} from "../../themes/colors";
import { Add } from "@mui/icons-material";

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
            <Box
                sx={{
                    flex: 1,
                    padding: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        gap: 2,
                    }}
                >
                    <IconButton
                        sx={{
                            backgroundColor: colors.primaryColor,
                            color: colors.black,
                            width: '48px',
                            height: '48px',
                            '&:hover': {
                                backgroundColor: colors.tertiaryColor,
                            }
                        }}
                    >
                        <Add sx={{ fontSize: '2rem' }} />
                    </IconButton>
                    <Typography variant="h6">Add New Category</Typography>
                </Box>

                {/* Rest of your content can go here */}
            </Box>
        </Box>
    )
}