import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { Box, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddMember() {
    const [open, setOpen] = React.useState(false);

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
            const projectId = params.id
            await axios.post("http://localhost:5000/section", {
                name: name,
                projectId: projectId,
            });
            setOpen(false);
            refreshPage()
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    };

    return (
        <div>
            <Box sx={{ ml: "10px" }}>
                <Box>
                    
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClose} sx={{ backdropFilter: "blur(0.8px)" }}>
                <DialogTitle sx={{ color: "#0288d1" }}>Add tasks</DialogTitle>
                <Divider variant="middle"/>
                <form onSubmit={saveSection}>
                    <Typography variant="body1" color="initial">
                        {msg}
                    </Typography>
                    <DialogContent>
                        <div>
                            <TextField
                                label="Title"
                                sx={{ m: 1, width: "384px" }}
                                id="name"
                                value={name}
                                // onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
