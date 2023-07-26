import {Course} from "../../models/Course.ts";
import {CircularProgress, TableCell, TableRow, TextField} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import {useState} from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {CourseRequest} from "../../models/CourseRequest.ts";
import {Teacher} from "../../models/Teacher.ts";
import AutocompleteTeacherSearch from "../teachers/AutocompleteTeacherSearch.tsx";

type CourseRowProps = {
    course: Course;
    handleDeleteCourse: (id: string) => void;
    isLoading: boolean;
    updateCourse: (id: string, course: CourseRequest) => void;
    teachers: Teacher[];
}

export default function CourseRow(props: CourseRowProps) {
    const [open, setOpen] = useState(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [courseToEdit, setCourseToEdit] = useState<CourseRequest>({
        name: props.course.name,
        amountOfStudents: props.course.amountOfStudents,
        teacherId: props.course.teacherId
    });

    const teacher = props.teachers.find(teacher => teacher.id === props.course.teacherId);

    function handleDeleteCourseButtonClick() {
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst diesen Kurs nicht wiederherstellen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja, löschen!',
            cancelButtonText: 'Abbrechen'

        }).then((result) => {
            if (result.isConfirmed) {
                props.handleDeleteCourse(props.course.id);
            }
        }).then()
    }

    function handleEditCourseButtonClick() {
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst die Änderungen nicht rückgängig machen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja, speichern!',
            cancelButtonText: 'Abbrechen'
        }).then((result) => {
            if (result.isConfirmed) {
                props.updateCourse(props.course.id, courseToEdit);
                setEditMode(false);
            }
            if (result.isDismissed) {
                setEditMode(false);
            }
        });
    }

    return (
        <TableRow>
            <TableCell
                component={"td"}
                onClick={() => setEditMode(true)}
            >
                {
                    editMode ?
                        <TextField
                            label={"Kursname"}
                            value={courseToEdit.name}
                            onChange={(event) => setCourseToEdit({...courseToEdit, name: event.target.value})}
                        /> :
                        props.course.name
                }
            </TableCell>
            <TableCell
                component={"td"}
                onClick={() => setEditMode(true)}
            >
                {
                    editMode ?
                        <TextField
                            inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                            label="Anzahl Studenten"
                            variant="outlined"
                            value={courseToEdit.amountOfStudents}
                            onChange={(event) => setCourseToEdit({
                                ...courseToEdit,
                                amountOfStudents: Number(event.target.value)
                            })}
                        /> :
                        props.course.amountOfStudents
                }
            </TableCell>
            <TableCell
                component={"td"}
                onClick={() => setEditMode(true)}
            >
                {
                    editMode ?
                        <AutocompleteTeacherSearch courseRequest={courseToEdit} open={open} setOpen={setOpen}
                                                   teachers={props.teachers} setCourseRequest={setCourseToEdit}/> :
                        teacher &&
                        teacher.salutation + " " + teacher.lastName
                }
            </TableCell>
            <TableCell component={"td"}>
                {
                    editMode ?
                        <>
                            <IconButton onClick={handleEditCourseButtonClick}>
                                <CheckIcon color={"success"}/>
                            </IconButton>
                            <IconButton onClick={() => setEditMode(false)}>
                                <CloseIcon color={"error"}/>
                            </IconButton>
                        </> :
                        <IconButton onClick={handleDeleteCourseButtonClick}>
                            {
                                props.isLoading ?
                                    <CircularProgress color={"error"}/> :
                                    <DeleteForeverIcon color={"error"}/>
                            }
                        </IconButton>
                }
            </TableCell>
        </TableRow>
    );
}