import {Box, Divider, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {colors} from "../../themes/colors";
import {navItems} from "../../services/utilities";


export const NavBar = ({ selectedIndex, onNavClick }:{ selectedIndex: number; onNavClick: (itemId: number) => void }) => {
    return (
        <Box
            sx={{
                width: "15%",
                backgroundColor: colors.tertiaryColor,
                borderRight: 1,
                borderColor: "divider",
            }}
        >
            <List sx={{ p: 0 }}>
                {navItems.map((item, index) => (
                    <Box key={item.id}>
                        <ListItem disablePadding>
                            <ListItemButton
                                selected={selectedIndex === item.id}
                                onClick={() => onNavClick(item.id)}
                                sx={{
                                    py: 2,
                                    px: 3,
                                    '&:hover': {
                                        backgroundColor: 'action.hover',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'action.selected',
                                        '&:hover': {
                                            backgroundColor: 'action.selected',
                                        },
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item.label}
                                />
                            </ListItemButton>
                        </ListItem>
                        {index < navItems.length - 1 && <Divider />}
                    </Box>
                ))}
            </List>
        </Box>
    );
};