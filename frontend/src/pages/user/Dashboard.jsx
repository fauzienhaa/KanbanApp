import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Loading from "../Loading";
import UserSidebar from "../../components/user/Sidebar";
import MiniDrawer from "../../components/admin/Sidebar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

const UserDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isLoading } = useSelector((state) => state.auth);
    
    const title = "Dashboard"
    useEffect(() => {
        document.title = `Kanban App | ${title}`;
    }, []);

    useEffect(() => {
        dispatch(getMe());
        if (isLoading) {
            <Loading fullHeight />;
        }
        if (isError) {
            navigate("/");
        }
    }, [dispatch, isError, navigate]);

    

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <UserSidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
                    <h1>Dashboard</h1>
                    <Typography variant="body1" color="initial">
                        User
                    </Typography>
                </Box>
            </Box>
        </>
    );
};

export default UserDashboard;
