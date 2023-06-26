import React, { useEffect } from "react";
import MiniDrawer from "../../components/admin/Sidebar";
import { Box, Typography } from "@mui/material";
import MemberList from "../../components/admin/MemberList";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AddProject from "../../components/admin/FormAddProject";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";
import Loading from "../Loading";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.black, 0.15),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        width: "240px",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "20ch",
        },
    },
}));

const Members = () => {
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

    return (
        <>
            <Box sx={{ display: "flex" }}>
                <MiniDrawer />
                <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 5 }}>
                    <h1>Members</h1>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Search sx={{ mb: 2 }}>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>
                        <AddProject />
                    </Box>
                    <MemberList />
                </Box>
            </Box>
        </>
    );
};

export default Members;
