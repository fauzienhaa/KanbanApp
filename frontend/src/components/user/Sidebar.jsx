import { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import FolderIcon from "@mui/icons-material/Folder";
import Chip from "@mui/material/Chip";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import { useNavigate } from "react-router-dom";
import { useBetween } from "use-between";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";
import assets from "../../assets";
import axios from "axios";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export const IsOpen = () => {
    const [open, setOpen] = useState(true);
    return {
        open,
        setOpen,
    };
};

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const lightTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const UserSidebar = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState("Dashboard");
    console.log(title);
    const { open, setOpen } = useBetween(IsOpen);
    // const {isActive, setIsActive} = useState(false)
    // const [isAdmin, setIsAdmin] = useState(true);

    const logOut = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/");
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // useEffect(() => {
    //     if (user.role == "user") {
    //         setIsAdmin = "false"
    //     }
    // }, [user]);

    const { user } = useSelector((state) => state.auth);

    const [allProjects, setAllProjects] = useState([]);

    const getProjects = async () => {
        const response = await axios.get("http://localhost:5000/members");
        setAllProjects(response.data);
    };

    const refreshPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        getProjects();
    }, []);

    console.log("Allproject", allProjects);

    return (
        <ThemeProvider theme={lightTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBar position="fixed" open={open}>
                    <Toolbar
                        sx={{
                            pr: "24px", // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: "none" }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {user && user.name}
                        </Typography>
                        <IconButton color="inherit" onClick={logOut}>
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open} position="fixed">
                    <DrawerHeader>
                        <img
                            src={assets.images.logoDark}
                            style={{ width: "120px", alignContent: "center" }}
                            alt="app logo"
                        />
                        <IconButton onClick={() => setOpen(!open)}>
                            {theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                <ChevronLeftIcon />
                            )}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    {open ? (
                        <List>
                            <ListItem
                                disablePadding
                                onClick={() => {
                                    navigate(`/dashboard`); refreshPage();
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        textTransform: "uppercase",
                                        fontSize: 12,
                                        fontWeight: "bold",
                                        mb: 1,
                                        opacity: open ? 1 : 0,
                                    }}
                                >
                                    Dashboard
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <Typography
                                sx={{
                                    textTransform: "uppercase",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    mt: 2,
                                    ml: 2,
                                    mb: 1,
                                    opacity: open ? 1 : 0,
                                    color: "#FF6363",
                                }}
                            >
                                YOUR BOARDS AS OWNER
                            </Typography>
                            <Divider variant="middle" />
                            {allProjects
                                .filter(
                                    (data) =>
                                        data.jabatan.name == "Owner"
                                    // console.log("data", data)
                                )
                                .map((item, index) => {
                                    // console.log("item", item)
                                    return (
                                        <ListItem
                                            key={index}
                                            disablePadding
                                            onClick={() => {
                                                navigate(`/board/${item.project.id}`); refreshPage();
                                            }}
                                        >
                                            <ListItemButton>
                                                <Typography
                                                    sx={{
                                                        ml: 3,
                                                        opacity: open ? 1 : 0,
                                                    }}
                                                >
                                                    {item?.project.judul}
                                                </Typography>
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            <Typography
                                sx={{
                                    textTransform: "uppercase",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    mt: 2,
                                    ml: 2,
                                    mb: 1,
                                    opacity: open ? 1 : 0,
                                    color: "#FFBD69",
                                }}
                            >
                                YOUR BOARDS
                            </Typography>
                            <Divider variant="middle" />
                            {allProjects.map((projects, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                        onClick={() => {
                                            navigate(`/board/${projects.project.id}`); refreshPage();
                                        }}
                                    >
                                        <ListItemButton>
                                            <Typography
                                                sx={{
                                                    ml: 3,
                                                    opacity: open ? 1 : 0,
                                                }}
                                            >
                                                {projects?.project.judul}
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    ) : (
                        <List>
                            <ListItem
                                disablePadding
                                onClick={() => {
                                    navigate(`/dashboard`); refreshPage();
                                }}
                            >
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open
                                            ? "initial"
                                            : "center",
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <HomeIcon />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                            <Chip
                                label=""
                                color="error"
                                size="small"
                                sx={{
                                    height: "10px",
                                    ml: 2,
                                    width: "35px",
                                    justifyContent: "center",
                                }}
                            />
                            <Divider variant="middle" />
                            {allProjects
                                .filter(
                                    (data) =>
                                        data.jabatan.name == "Owner"
                                    // console.log("data", data)
                                )
                                .map((item, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            disablePadding
                                            onClick={() => {
                                                navigate(`/board/${item.project.id}`); refreshPage();
                                            }}
                                        >
                                            <ListItemButton>
                                                <img
                                                    src={
                                                        assets.images.projectImg
                                                    }
                                                    style={{
                                                        width: "35px",
                                                        alignContent: "center",
                                                    }}
                                                    alt="app logo"
                                                />
                                                {/* <Typography
                                                    sx={{
                                                        ml: 3,
                                                        opacity: open ? 1 : 0,
                                                    }}
                                                >
                                                    {projects?.project.judul}
                                                </Typography> */}
                                            </ListItemButton>
                                        </ListItem>
                                    );
                                })}
                            <Chip
                                label=""
                                color="warning"
                                size="small"
                                sx={{
                                    height: "10px",
                                    ml: 2,
                                    width: "35px",
                                    justifyContent: "center",
                                }}
                            />
                            <Divider variant="middle" />
                            {allProjects.map((projects, index) => {
                                return (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                        onClick={() => {
                                            navigate(`/board/${projects.project.id}`); refreshPage();
                                        }}
                                    >
                                        <ListItemButton>
                                            <img
                                                src={assets.images.projectImg}
                                                style={{
                                                    width: "35px",
                                                    alignContent: "center",
                                                }}
                                                alt="app logo"
                                            />
                                            <Typography
                                                sx={{
                                                    ml: 3,
                                                    opacity: open ? 1 : 0,
                                                }}
                                            >
                                                {projects?.project.judul}
                                            </Typography>
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                        </List>
                    )}
                </Drawer>
            </Box>
        </ThemeProvider>
    );
};

export default UserSidebar;
