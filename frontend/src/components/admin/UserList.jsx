import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import DeleteUserDialog from "./DeleteUserAlert";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const columns = [
    { id: "name", label: "Name", minWidth: 200 },
    { id: "email", label: "Email", minWidth: 100 },
    { id: "role", label: "Role", minWidth: 70 },
    { id: "action", label: "Actions", minWidth: 20, align: "center" },
];

export default function UserList() {
    const [allUsers, setAllUsers] = useState([]);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:5000/users");
        setAllUsers(response.data);
    };

    const deleteUser = async (userId) => {
        await axios.delete(`http://localhost:5000/users/${userId}`);
        allUsers();
    };

    const refreshPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        getUsers();
    }, []);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const lightTheme = createTheme({
        palette: {
            mode: "light",
        },
    });

    return (
        <ThemeProvider theme={lightTheme}>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer sx={{ maxHeight: 460 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        sx={{
                                            backgroundColor: "#0288d1",
                                            color: "white",
                                        }}
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allUsers
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((users, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={users.uuid}
                                        >
                                            <TableCell>{users.name}</TableCell>
                                            <TableCell>{users.email}</TableCell>
                                            <TableCell>{users.role}</TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    flexGrow: 1,
                                                }}
                                            >
                                                <IconButton
                                                    aria-label="details"
                                                    color="primary"
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton aria-label="edit">
                                                    <EditIcon />
                                                </IconButton>
                                                <DeleteUserDialog
                                                    userId={users.uuid}
                                                    name={users.name}
                                                />
                                            </TableCell>
                                            {/* {columns.map((column) => {
                                            const value = users[column.id];
                                            return (
                                                <TableCell
                                                    key={column.id}
                                                >
                                                    {column.format &&
                                                    typeof value === "number"
                                                        ? column.format(value)
                                                        : value}
                                                    
                                                </TableCell>
                                            );
                                        })} */}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={allUsers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </ThemeProvider>
    );
}
