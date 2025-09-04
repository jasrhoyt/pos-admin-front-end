import { Box } from "@mui/material";
import { AddCategoryButton } from "./AddCategoryButton";
import { Menu } from "./Menu";
import { Reports } from "./Reports";
import { Employees } from "./Employees";

export const DashboardContent = ({ navbarIndex }: { navbarIndex: number }) => {


    const renderContent = () => {
        switch (navbarIndex) {
            case 0:
                return <Menu />;
            case 1:
                return <Reports />;
            case 2:
                return <Employees />;
        }
    };

    return (
        <Box
            sx={{
                flex: 1,
                padding: 2,
            }}
        >
            <AddCategoryButton />
            {renderContent()}
        </Box>
    );
};