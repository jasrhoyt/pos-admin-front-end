import {Box, FormControl, Grid, Stack, TextField, Tooltip, Typography} from "@mui/material";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";


export const RegisterUserInfo = (
    { firstName, setFirstName, lastName, setLastName, companyName, setCompanyName, companyEmail, setCompanyEmail, password, setPassword, verifiedPassword, setVerifiedPassword }:
    {
        firstName?: string,
        setFirstName: (inputString: string) => void,
        lastName?: string,
        setLastName: (inputString: string) => void;
        companyName?: string;
        setCompanyName: (inputString: string) => void;
        companyEmail?: string,
        setCompanyEmail: (inputString: string) => void;
        password?: string;
        setPassword: (inputString: string) => void;
        verifiedPassword?: string;
        setVerifiedPassword: (inputString: string) => void
    }
) => {

    return (
        <Box>
            <Stack spacing={2}>
                <Typography variant="h5">
                    User Info
                </Typography>
                <Box>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="First Name *"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Last Name *"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <Grid container spacing={2} alignItems="center">
                        <Grid size={11}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Company Name *"
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={1}>
                            <Tooltip arrow title={<Typography>Address of the restaurant or parent company</Typography>}>
                                <InfoOutlineIcon sx={{ fontSize: 28, cursor: 'pointer' }} />
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <FormControl fullWidth>
                        <TextField
                            label="Company Email *"
                            value={companyEmail}
                            type='email'
                            autoComplete="off"
                            onChange={(e) => setCompanyEmail(e.target.value)}
                        />
                    </FormControl>
                </Box>
                <Box>
                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Password *"
                                    value={password}
                                    type="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid size={6}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Verify Password *"
                                    value={verifiedPassword}
                                    type="password"
                                    autoComplete="new-password"
                                    onChange={(e) => setVerifiedPassword(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </Box>
    )
}