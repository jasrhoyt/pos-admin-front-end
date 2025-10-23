import {Logout as LogoutIcon, Person as PersonIcon} from "@mui/icons-material";


export const validate_password = (password?: string, verifiedPassword?: string) => {
    return password === verifiedPassword;
}

export const toNullIfEmpty = (value: string) => (value === "" ? null : value);

export enum MenuEnum {
    MENU = 0,
    REPORTS = 1,
    EMPLOYEES = 2,
}

export const navItems = [
    {
        id: MenuEnum.MENU,
        label: "Menu",
    },
    {
        id: MenuEnum.REPORTS,
        label: "Reports"
    },
    {
        id: MenuEnum.EMPLOYEES,
        label: "Employees"
    }
];

export const menuItems = [
    {
        id: 'user-info',
        label: 'User Info',
        icon: PersonIcon,
        action: 'userInfo',
        showDivider: true
    },
    {
        id: 'logout',
        label: 'Logout',
        icon: LogoutIcon,
        action: 'logout',
        showDivider: false
    }
];