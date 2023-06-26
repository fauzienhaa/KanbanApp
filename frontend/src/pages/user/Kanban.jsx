import React, { useEffect, useState } from "react";
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
import Kanban from "../../components/user/Kanban";
import MemberListUser from "../../components/user/MemberList";
import { useParams } from "react-router-dom";
import axios from "axios";

const Board = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, isLoading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
        if (isLoading) {
            <Loading fullHeight />;
        }
        if (isError) {
            navigate("/");
        }
    }, [dispatch, isError, navigate]);

    const params = useParams();

    const [project, setProject] = useState([]);

    const getProjects = async () => {
        const projectId = params.id;
        const response = await axios.get(
            `http://localhost:5000/projects/${projectId}`
        );
        setProject(response.data);
    };

    useEffect(() => {
        getProjects();
    }, []);

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <UserSidebar />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                    <Box position="fixed">
                        <Typography sx={{ mb: 5 }} variant="h4">
                            {project.judul}
                        </Typography>
                        <MemberListUser />
                    </Box>
                    <Kanban />
                </Box>
            </Box>
        </>
    );
};

export default Board;
