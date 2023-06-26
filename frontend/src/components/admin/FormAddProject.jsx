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
import axios from "axios";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddProject() {
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [role, setRole] = React.useState("");

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
        setRole(event.target.value);
    };

    const [roleTooltip, setRoleTooltip] = React.useState("");

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [due, setDue] = React.useState("");
    const [msg, setMsg] = React.useState("");
    // const [status, setStatus] = React.useState("");
    // const navigate = useNavigate();

    const resetValue = () => {
        setTitle("");
        setDescription("");
        setDue("");
    };

    const saveProject = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/projects", {
                judul: title,
                deskripsi: description,
                due: due,
                status: "INPROGRESS",
            });
            setOpen(false);
            // setSaveSuccess(true)
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
                // setMsgExist(true);
            }
        }
    };

    return (
        <div>
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleClickOpen}
                color="primary"
            >
                Add Project
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ color: "#0288d1" }}>Add Project</DialogTitle>
                <form onSubmit={saveProject}>
                    <Typography variant="body1" color="initial">
                        {msg}
                    </Typography>
                    <DialogContent>
                        <div>
                            <TextField
                                label="Title"
                                sx={{ m: 1, width: "30ch" }}
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                sx={{ m: 1, width: "59ch" }}
                                id="description"
                                value={description}
                                multiline
                                rows={6}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{ m: 1 }}
                                    label="Due Date"
                                    id="due"
                                    value={due}
                                    onChange={(newDue) => setDue(newDue)}
                                />
                            </LocalizationProvider>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="error"
                            onClick={() => {
                                resetValue();
                                handleClose();
                                setMsg("");
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">Create</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
