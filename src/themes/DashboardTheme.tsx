import { createTheme } from '@mui/material/styles';
import {colors} from "./colors";

export const DashboardTheme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: colors.black,
                },
            },
        },
        MuiButton: {
            defaultProps: {
                fullWidth: true,
                sx: {
                    color: "black",
                    backgroundColor: colors.primaryColor,
                    '&:hover': {
                        color: colors.white,
                        backgroundColor: "darkblue",
                    },
                },
            },
        },
        MuiLink: {
            defaultProps: {
                sx: {
                    color: colors.black,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textDecorationColor: 'currentColor',
                },
            }
        },
        MuiTypography: {
            defaultProps: {
                sx: {
                    color: colors.black,
                    display: 'flex',
                    justifyContent: 'center',
                }
            }
        },
        MuiSelect: {
            defaultProps: {
                fullWidth: true,
                sx: {
                    backgroundColor: colors.secondaryColor,
                }
            },
        },
    },
});