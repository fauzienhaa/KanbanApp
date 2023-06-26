import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import assets from "../assets";
import Alert from "@mui/material/Alert";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Monster Group
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const theme = createTheme();

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isError, isLoading, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user && user.role !== "admin") {
            // <Loading />
            navigate("/dashboard");
        }
        if (user && user.role === "admin") {
            // <Loading />
            navigate("/admin");
        }
    }, [user, isSuccess, navigate]);

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    const Auth = (e) => {
        e.preventDefault();
        dispatch(LoginUser({ email, password }));
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <img
                        src={assets.images.logoDark}
                        style={{ width: "200px" }}
                        alt="app logo"
                    />
                    <Box
                        component="form"
                        onSubmit={Auth}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Box
                            sx={{
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        ></Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoading ? "Loading..." : "Sign In"}
                        </Button>
                        {isError && <Alert severity="error">{message}</Alert>}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
