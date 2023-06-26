import * as React from "react";
import { useState, useEffect } from "react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import assets from "../../assets";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { lightGreen, green } from "@mui/material/colors";

export default function MemberListUser() {
    const [projects, setProject] = useState();

    const params = useParams();

    const getProject = async () => {
        const projectId = params.id;
        const response = await axios.get(
            `http://localhost:5000/projects/${projectId}`
        );
        setProject(response.data);
    };

    console.log("project", projects);

    const refreshPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        getProject();
    }, []);

    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    });

    return (
        <Box sx={{ display: "flex", mb: 4, alignItems: "center" }} >
            <Typography variant="h6" sx={{ mr: 1 }}>
                Members :
            </Typography>
            {projects?.members.map((members, index) => {
                return (
                    <Tooltip
                        key={index}
                        sx={{ ml: 0.5 }}
                        title={members?.user?.name + ","}
                        placement="top"
                    >
                        <img
                            src={assets.images.profileImg}
                            style={{
                                width: "50px",
                                alignContent: "center",
                            }}
                            alt="app logo"
                        />
                    </Tooltip>
                    // <Typography variant="h6" key={index} sx={{ml:1}}>
                    //     {members?.user?.name + ","}
                    // </Typography>
                );
            })}
            <Tooltip title="Add Member" placement="top">
                <IconButton aria-label="" disableRipple>
                    <AddRoundedIcon sx={{ fontSize: "40px" }} />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
