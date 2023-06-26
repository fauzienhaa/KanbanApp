import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DeleteSectionDialog(props) {
    const [showPassword, setShowPassword] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [role, setRole] = React.useState("");

    const [isDeleted, setDeleted] = React.useState(false);

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

    const deleteSection = async (props) => {
        await axios.delete(`http://localhost:5000/section/${props}`);
        refreshPage();
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <Box>
            <IconButton
                aria-label="delete"
                onClick={handleClickOpen}
                color="error"
            >
                <DeleteOutlineIcon />
            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                sx={{ backdropFilter: "blur(0.8px)" }}
            >
                <DialogTitle>Delete Section</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure want to delete "{props.name}"?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        color="error"
                        onClick={() => {
                            deleteSection(props.sectionId);
                            handleClose();
                            
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
