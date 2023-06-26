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
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import { yellow, green, lightGreen } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const columns = [
    { id: "title", label: "Title", minWidth: 200 },
    { id: "descriptions", label: "Descriptions", minWidth: 100 },
    { id: "owner", label: "Owner", minWidth: 100 },
    { id: "members", label: "Members", minWidth: 100 },
    { id: "due", label: "Due to", minWidth: 100 },
    { id: "status", label: "Status", minWidth: 100 },
    { id: "action", label: "Actions", minWidth: 20, align: "center" },
];

export default function ProjectList() {
    const [allProjects, setAllProjects] = useState([]);

    const getProjects = async () => {
        const response = await axios.get("http://localhost:5000/projects");
        setAllProjects(response.data);
    };

    const deleteProject = async (projectId) => {
        await axios.delete(`http://localhost:5000/users/${projectId}`);
        allProjects();
    };

    const refreshPage = () => {
        window.location.reload();
    };

    useEffect(() => {
        getProjects();
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
    console.log("allProject", allProjects);

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
                            {allProjects
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((projects, index) => {
                                    console.log("projects", projects);
                                    console.log("members", projects?.members);
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={projects.uuid}
                                        >
                                            <TableCell>
                                                {projects.judul}
                                            </TableCell>
                                            <TableCell>
                                                {projects.deskripsi}
                                            </TableCell>
                                            <TableCell>
                                                {projects?.members
                                                    .filter(
                                                        (member) =>
                                                            member.jabatanId ===
                                                            1
                                                    )
                                                    .map((jabatan, index) => {
                                                        return (
                                                            <Typography
                                                                variant="subtitle2"
                                                                key={index}
                                                            >
                                                                {
                                                                    jabatan.user
                                                                        .name
                                                                }
                                                            </Typography>
                                                        );
                                                    })}
                                            </TableCell>
                                            <TableCell>
                                                {projects?.members.map(
                                                    (members, index) => {
                                                        return (
                                                            <Typography
                                                                variant="subtitle2"
                                                                key={index}
                                                            >
                                                                {members?.user
                                                                    ?.name +
                                                                    ","}
                                                            </Typography>
                                                        );
                                                    }
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {projects.due}
                                            </TableCell>
                                            <TableCell
                                                sx={
                                                    projects.status == "DONE"
                                                        ? { color: "#64dd17" }
                                                        : { color: "#f57f17" }
                                                }
                                            >
                                                <Typography variant="subtitle2">
                                                    {projects.status}
                                                </Typography>
                                            </TableCell>
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
                                                    projectId={projects.uuid}
                                                    title={projects.judul}
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
                    count={allProjects.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </ThemeProvider>
    );
}
