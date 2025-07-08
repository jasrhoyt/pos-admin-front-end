import { createTheme } from '@mui/material/styles';

export const LoginTheme = createTheme({
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
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#000000', // black label
                },
            },
        },
        MuiButton: {
            defaultProps: {
                fullWidth: true,
            },
        },
    },
});