import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "../components/user/Sidebar";
import Loading from "../pages/Loading";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: { mode: "dark" },
});

const UserLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    return (
        <ThemeProvider theme={theme}>
            {loading ? (
                <Loading fullHeight />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <Sidebar />
                    <Box
                        sx={{
                            flexGrow: 1,
                            p: 1,
                            width: "max-content",
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            )}
            ;
        </ThemeProvider>
    );
};

export default UserLayout;
