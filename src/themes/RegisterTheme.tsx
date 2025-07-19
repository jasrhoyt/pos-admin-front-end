import { createTheme } from '@mui/material/styles';
import {colors} from "./colors";

export const RegisterTheme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                sx: {
                    backgroundColor: colors.primaryColor,
                    borderRadius: '8px'
                }
            },
        },
        MuiSelect: {
            defaultProps: {
                fullWidth: true,
                sx: {
                    backgroundColor: colors.primaryColor,
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
                    backgroundColor: colors.primaryColor,
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: "8px",
                    textTransform: "none",
                    '&:hover': {
                        backgroundColor: colors.secondaryColor,
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
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: colors.secondaryColor,
                    color: colors.white,
                    borderRadius: '8px',
                    textAlign: "center"
                },
                arrow: {
                    color: colors.secondaryColor,
                }
            },
        }
    },
});