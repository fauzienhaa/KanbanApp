import "./kanban.scss";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import mockData from "../../mockData";
import { useState, useEffect } from "react";
import Card from "../card";
import axios from "axios";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import AddSection from "./FormAddSection.jsx";
import DeleteSectionDialog from "./DeleteSectionAlert.jsx";
import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import AddTasks from "./FormAddTasks";

const Kanban = () => {
    const [jabatan, setJabatan] = useState("");

    const [allSection, setAllSection] = useState([]);
    // const { user } = useSelector((state) => state.auth);

    const params = useParams();

    const getSection = async () => {
        const projectId = params.id;
        const response = await axios.get(
            `http://localhost:5000/board/${projectId}`
        );
        setAllSection(response.data);
    };

    console.log("section", allSection);

    // const getJabatan = async() => {
    //     const userId = user.id
    //     const response = await axios.get(
    //         `http://localhost:5000/board/${projectId}`
    //     )
    // }

    useEffect(() => {
        getSection();
    }, []);

    console.log("params", params);

    console.log("allSection", allSection);

    //mockData diubah api get tasks
    const [data, setData] = useState(mockData);
    console.log("data", data);
    console.log(
        "index 1",
        allSection.findIndex((e) => {
            // e.id == 1
            console.log("e", e);
        })
    );

    const onDragEnd = (result) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        console.log("source", source);
        console.log("destination", destination);
        console.log("taskId", draggableId);

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = allSection.findIndex(
                (e) => Number(e.id) === Number(source.droppableId)
                // console.log("e", e.id == source.droppableId)
            );

            const destinationColIndex = allSection.findIndex(
                (e) => Number(e.id) === Number(destination.droppableId)
            );

            console.log("sourcecolindex", sourceColIndex);
            console.log("destinationColIndex", destinationColIndex);

            const sourceCol = allSection[sourceColIndex];
            const destinationCol = allSection[destinationColIndex];

            console.log("sourcecol", sourceCol);
            console.log("destinationcol", destinationCol);

            const sourceTask = [...sourceCol.tasks];
            const destinationTask = [...destinationCol.tasks];

            const [removed] = sourceTask.splice(source.index, 1);
            destinationTask.splice(destination.index, 0, removed);

            allSection[sourceColIndex].tasks = sourceTask;
            allSection[destinationColIndex].tasks = destinationTask;

            // setData diubah updateTasks
            setAllSection(allSection);
        }
    };

    return (
        <Box sx={{ mt: 25 }}>
            <Box sx={{maxHeight: 100}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Box className="kanban">
                        {allSection.map((section) => (
                            <Droppable
                                key={section.id}
                                droppableId={section.id.toString()}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        className="kanban__section"
                                        ref={provided.innerRef}
                                    >
                                        <Box
                                            className="kanban__section__title"
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Box sx={{ mt: 1 }}>
                                                {section.judul}
                                            </Box>
                                            <DeleteSectionDialog
                                                sectionId={section.id}
                                                name={section.judul}
                                            />
                                        </Box>
                                        <Box>
                                            <Box className="kanban__section__content">
                                                {section.tasks.map(
                                                    (task, index) => (
                                                        <Draggable
                                                            key={task.id}
                                                            draggableId={task.id.toString()}
                                                            index={index}
                                                        >
                                                            {(
                                                                provided,
                                                                snapshot
                                                            ) => (
                                                                <div
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        ...provided
                                                                            .draggableProps
                                                                            .style,
                                                                        opacity:
                                                                            snapshot.isDragging
                                                                                ? "0.5"
                                                                                : "1",
                                                                    }}
                                                                >
                                                                    <Card>
                                                                        {
                                                                            task.judul
                                                                        }
                                                                    </Card>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                )}
                                                {provided.placeholder}
                                            </Box>
                                            <Box className="kanban__section__content">
                                                <AddTasks />
                                            </Box>
                                        </Box>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                        <AddSection />
                    </Box>
                </DragDropContext>
            </Box>
        </Box>
    );
};

export default Kanban;
