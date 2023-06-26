import React from "react";
import MiniDrawer from "../../components/admin/Sidebar";
import { Box, Typography } from "@mui/material";

const EditProject = () => {
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <MiniDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
                    <h1>Edit Project</h1>
                </Box>
            </Box>
        </>
    );
};

export default EditProject;
