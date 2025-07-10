import { createTheme } from '@mui/material/styles';

export const RegisterTheme = createTheme({
    components: {
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
            },
        },
        MuiSelect: {
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
                    color: 'black',
                },
            },
        },
        MuiButton: {
            defaultProps: {
                fullWidth: true,
                sx: {
                    color: "black",
                    backgroundColor: "lightblue",
                    '&:hover': {
                        color: "white",
                        backgroundColor: "darkblue",
                    },
                },
            },
        },
        MuiLink: {
            defaultProps: {
                sx: {
                    color: 'black',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    textDecorationColor: 'currentColor',
                },
            }
        },
        MuiTypography: {
            defaultProps: {
                sx: {
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '8px',
                    textAlign: "center"
                },
            },
        }
    },
});