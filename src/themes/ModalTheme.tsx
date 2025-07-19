import { createTheme } from '@mui/material/styles';
import {colors} from "./colors";

export const ModalTheme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                sx: {
                    backgroundColor: 'lightblue',
                    borderRadius: '8px'
                }
            },
        },
        MuiSelect: {
            defaultProps: {
                fullWidth: true,
                sx: {
                    backgroundColor: 'lightblue',
                }
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
                sx: {
                    color: colors.black,
                    backgroundColor: "lightblue",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: "8px",
                    textTransform: "none",
                    '&:hover': {
                        backgroundColor: colors.secondaryColor,
                    },
                },
            },
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
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: colors.primaryColor,
                    color: colors.white,
                    borderRadius: '8px',
                    textAlign: "center"
                },
                arrow: {
                    color: colors.primaryColor,
                }
            },
        }
    },
});