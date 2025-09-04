import {Box, IconButton, Typography} from "@mui/material";
import {colors} from "../../themes/colors";
import {Add} from "@mui/icons-material";


export const AddCategoryButton = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 2,
            }}
        >
            <IconButton
                sx={{
                    backgroundColor: colors.primaryColor,
                    color: colors.black,
                    width: '48px',
                    height: '48px',
                    '&:hover': {
                        backgroundColor: colors.tertiaryColor,
                    }
                }}
            >
                <Add sx={{ fontSize: '2rem' }} />
            </IconButton>
            <Typography variant="h6">Add New Category</Typography>
        </Box>
    )
}