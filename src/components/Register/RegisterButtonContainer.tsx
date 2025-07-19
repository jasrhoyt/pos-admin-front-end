import {Box, Button, Typography} from "@mui/material";


export const RegisterButtonContainer = (
    { onRegisterButtonClick, errorMessage, buttonCopy }:
    { onRegisterButtonClick: () => Promise<void>; errorMessage: string, buttonCopy: string }
) => {

    return (
        <>
            <Box display="flex" justifyContent='center'>
                <Button onClick={() => onRegisterButtonClick}>
                    {buttonCopy}
                </Button>
            </Box>
            <Typography sx={{color: "red", display: "flex", justifyContent: "center"}}>{errorMessage}</Typography>
        </>
    )
}