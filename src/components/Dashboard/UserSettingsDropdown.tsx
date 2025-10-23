import React, { useState } from 'react';
import {
    Grid,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider
} from '@mui/material';
import {
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Person as PersonIcon
} from '@mui/icons-material';
import { clearUser } from "../../redux/slices/userSlices";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {colors} from "../../themes/colors";
import {menuItems} from "../../services/utilities";


export const UserSettingsDropdown = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleSettingsClick = (event: any) => {
        setAnchorEl(event.currentTarget);
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setIsDropdownOpen(false);
    };

    const handleMenuItemClick = (action: string) => {
        switch (action) {
            case 'logout':
                navigate("/");
                dispatch(clearUser());
                break;
            case 'userInfo':
                navigate("/settings");
                break;
            default:
                break;
        }
        handleClose();
    };

    return (
        <Grid size={1.5} display="flex" justifyContent="center" alignItems="center">
            <SettingsIcon
                sx={{ cursor: "pointer", fontSize: "3rem" }}
                onClick={handleSettingsClick}
            />
            <Menu
                id="settings-menu"
                anchorEl={anchorEl}
                autoFocus={false}
                open={isDropdownOpen}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            backgroundColor: colors.tertiaryColor,
                        }
                    }
                }}
            >
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <MenuItem
                            onClick={() => handleMenuItemClick(item.action)}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'action.hover', // Material-UI's default hover
                                }
                            }}
                        >
                            <ListItemIcon>
                                <item.icon fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>{item.label}</ListItemText>
                        </MenuItem>
                        {item.showDivider && index < menuItems.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Menu>
        </Grid>
    );
}