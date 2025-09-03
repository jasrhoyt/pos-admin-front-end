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

    const handleLogout = () => {
        navigate("/");
        dispatch(clearUser());
        handleClose();
    };

    const handleUserInfo = () => {
        navigate("/settings");
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
            >
                <MenuItem onClick={handleUserInfo}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>User Info</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </MenuItem>
            </Menu>
        </Grid>
    );
}