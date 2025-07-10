import { createTheme } from '@mui/material/styles';

export const RegisterTheme = createTheme({
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
                    color: 'black',
                },
            },
        },
        MuiButton: {
            defaultProps: {
                sx: {
                    color: "black",
                    backgroundColor: "lightblue",
                    border: "1px solid rgba(0, 0, 0, 0.23)",
                    borderRadius: "8px",
                    textTransform: "none",
                    '&:hover': {
                        backgroundColor: "#fcf5c7",
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
                    backgroundColor: '#fcf5c7',
                    color: 'white',
                    borderRadius: '8px',
                    textAlign: "center"
                },
                arrow: {
                    color: '#ffcc6e',
                }
            },
        }
    },
});