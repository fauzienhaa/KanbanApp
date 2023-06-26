import * as React from "react";
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
import { Box, Typography } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddUser() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [roleTooltip, setRoleTooltip] = React.useState("");

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confPassword, setConfPassword] = React.useState("");
    const [role, setRole] = React.useState("");
    const [msg, setMsg] = React.useState("");
    const navigate = useNavigate();

    const resetValue = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfPassword("");
        setRole("");
    };

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/users", {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword,
                role: role,
            });
            setOpen(false)
            setSaveSuccess(true)
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                setMsgExist(true);
            }
        }
    };

    const [msgExist, setMsgExist] = React.useState(false);
    const [saveSuccess, setSaveSuccess] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setRoleTooltip(event.target.value);
        setRole(event.target.value);
    };

    return (
        <div>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
                color="primary"
            >
                Add User
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ color: "#0288d1" }}>Add User</DialogTitle>
                <form onSubmit={saveUser}>
                    <Typography variant="body1" color="initial">
                        {msg}
                    </Typography>
                    <DialogContent>
                        <div>
                            <TextField
                                label="Name"
                                sx={{ m: 1, width: "30ch" }}
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                sx={{ m: 1, width: "35ch" }}
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <FormControl fullWidth sx={{ m: 1, width: "15ch" }}>
                                <InputLabel id="demo-simple-select-label">
                                    Role
                                </InputLabel>
                                <Select
                                    id="role"
                                    label={roleTooltip}
                                    onChange={handleChange}
                                    value={role}
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="user">User</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl
                                sx={{ m: 1, width: "25ch" }}
                                variant="outlined"
                            >
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    id="password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    value={password}
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                            </FormControl>
                            <FormControl
                                sx={{ m: 1, width: "25ch" }}
                                variant="outlined"
                            >
                                <InputLabel htmlFor="outlined-adornment-password">
                                    Confirm Password
                                </InputLabel>
                                <OutlinedInput
                                    type={showPassword ? "text" : "password"}
                                    id="confpassword"
                                    onChange={(e) =>
                                        setConfPassword(e.target.value)
                                    }
                                    value={confPassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={
                                                    handleClickShowPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                                edge="end"
                                            >
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirm Password"
                                />
                            </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="error"
                            onClick={() => {
                                resetValue();
                                handleClose();
                                setMsg("")
                            }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                        >
                            Create
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
