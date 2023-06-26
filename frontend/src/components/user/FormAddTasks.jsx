import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, FormGroup, FormControl } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../../css/custom-editor.css";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import Select from "@mui/material/Select";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function AddTasks() {
    const [open, setOpen] = React.useState(false);

    const [priority, setPriority] = React.useState("");
    const [due, setDue] = React.useState("");

    const handleChange = (event) => {
        setPriority(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const [name, setName] = React.useState("");
    const [msg, setMsg] = React.useState("");

    const resetValue = () => {
        setName("");
    };

    const params = useParams();

    const saveSection = async (e) => {
        e.preventDefault();
        try {
            const projectId = params.id;
            await axios.post("http://localhost:5000/section", {
                name: name,
                projectId: projectId,
            });
            setOpen(false);
            refreshPage();
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <Box sx={{ mt: "10px" }}>
                <Box>
                    <Button
                        // variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => {
                            handleClickOpen();
                        }}
                        // disableRipple
                        sx={{
                            alignContent: "center",
                            alignItems: "center",
                            width: "125px",
                            height: "50px",
                            padding: "10px",
                            borderRadius: "10px",
                            "&.MuiButtonBase-root:hover": {
                                bgcolor: "transparent",
                            },
                        }}
                    >
                        <Typography
                            sx={{ mt: 0.5 }}
                            variant="body2"
                            color="primary"
                        >
                            Add Tasks
                        </Typography>
                    </Button>
                </Box>
            </Box>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{ backdropFilter: "blur(0.8px)" }}
                maxWidth="md"
            >
                <DialogTitle sx={{ color: "#0288d1" }}>Add Task</DialogTitle>
                <form onSubmit={saveSection}>
                    <Typography variant="body1" color="initial">
                        {msg}
                    </Typography>
                    <DialogContent sx={{ height: "620px" }}>
                        <Box sx={{ m: 1 }}>
                            <TextField
                                label="Title"
                                sx={{ mb: 2 }}
                                id="name"
                                fullWidth
                                value={name}
                                // onChange={(e) => setName(e.target.value)}
                            />
                            {/* <Typography variant="body2" >Description :</Typography> */}
                            <FormGroup>
                                <CKEditor
                                    editor={ClassicEditor}
                                    config={{
                                        removePlugins: [
                                            "ImageUpload", "EasyImage", "MediaEmbed", "TableToolbar", "Table"
                                        ],
                                    }}
                                    onInit={(editor) => {}}
                                />
                            </FormGroup>
                            <FormControl
                                sx={{ mt: 2, minWidth: 120 }}
                                // size="small"
                            >
                                <InputLabel id="demo-simple-select-helper-label">
                                    Priority
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={priority}
                                    label="Priority"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Low">Low</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="{3}">High</MenuItem>
                                </Select>
                            </FormControl>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    sx={{ m: 2 }}
                                    label="Due Date"
                                    id="due"
                                    value={due}
                                    onChange={(newDue) => setDue(newDue)}
                                />
                            </LocalizationProvider>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            color="error"
                            onClick={() => {
                                // resetValue();
                                handleClose();
                                // setMsg("");
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
