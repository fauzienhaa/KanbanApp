import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Typography, Grid, Paper } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import MiniDrawer from "./Sidebar";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice"

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: "60px",
}));

const EditUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isError} = useSelector((state => state.auth));

    useEffect(()=>{
        dispatch(getMe());
        if(isError){
            navigate("/");
        }
    }, [dispatch, isError, navigate]);
    return (
        <>
            <Box sx={{ display: "flex" }}>
                <MiniDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
                    <h1>Edit User</h1>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            // Change the size to fit the parent element of this div
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <Paper sx={{ width: "100%", overflow: "hidden" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    p: 1,
                                    m: 2,
                                    mt: 3,
                                    // justifyContent: "center",
                                    // alignItems: "center"
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItem: "center",
                                    }}
                                >
                                    <Box
                                        display="grid"
                                        gridTemplateColumns="repeat(12, 1fr)"
                                        gap={2}
                                    >
                                        
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </div>
                </Box>
            </Box>
        </>
    );
};

export default EditUser;
