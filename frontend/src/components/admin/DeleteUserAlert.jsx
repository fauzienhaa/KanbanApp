import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { Box, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function DeleteUserDialog(props) {
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

    const deleteUser = async (props) => {
        await axios.delete(`http://localhost:5000/users/${props}`);
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClickOpen} color="error">
                <DeleteIcon />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ color: "black" }}>Delete User</DialogTitle>
                <DialogContent>
                    <Typography variant="body1" color="initial">
                        Are you sure want to delete this record?
                    </Typography>
                    <Typography variant="body1" color="initial">
                        Name : {props.name}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        color="error"
                        onClick={() => {
                            deleteUser(props.userId);
                            handleClose();
                            refreshPage();
                        }}
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
