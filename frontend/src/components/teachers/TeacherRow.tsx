import {Teacher} from "../../models/Teacher.ts";
import {CircularProgress, TableCell, TableRow, TextField} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2'
import {ChangeEvent, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {TeacherRequest} from "../../models/TeacherRequest.ts";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";

type TeacherCardProps = {
    teacher: Teacher;
    deleteTeacher: (id: string) => void;
    updateTeacher: (id: string, teacher: TeacherRequest) => void;
    loadingTeachers: boolean;
}

export default function TeacherRow(props: TeacherCardProps) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const [teacher, setTeacher] = useState<Teacher>(props.teacher);

    function handleDeleteTeacher() {
        Swal.fire({
            title: 'Möchtest du ' + teacher.firstName + ' ' + teacher.lastName + ' wirklich löschen?',
            text: "Es kann nicht rückgängig gemacht werden!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Abbrechen',
            confirmButtonText: 'Ja, bitte löschen!',
        }).then((result) => {
            if (result.isConfirmed) {
                props.deleteTeacher(teacher.id);
            }
        })
    }

    function handleEditTeacher() {
        setEditMode(true);
    }

    function handleChangeSalutation(event: SelectChangeEvent) {
        const value = event.target.value;
        setTeacher({...teacher, salutation: value});
    }

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setTeacher({...teacher, [event.target.name]: event.target.value})
    }

    function handleUpdateTeacher() {
        Swal.fire({
            title: 'Änderungen speichern?',
            text: "Möchtest du die Änderungen wirklich speichern?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Abbrechen',
            confirmButtonText: 'Ja, bitte speichern!',
        }).then((result) => {
            if (result.isConfirmed) {
                props.updateTeacher(teacher.id, teacher);
                setEditMode(false);
            }
            setEditMode(false);
        });
    }

    return (
        <TableRow>
            <TableCell component={"td"} onClick={handleEditTeacher}>
                {
                    editMode ?
                        <Select
                            value={teacher.salutation}
                            onChange={handleChangeSalutation}
                        >
                            <MenuItem value={"Frau"}>Frau</MenuItem>
                            <MenuItem value={"Herr"}>Herr</MenuItem>
                            <MenuItem value={"Divers"}>Divers</MenuItem>
                        </Select> :
                        teacher.salutation
                }
            </TableCell>
            <TableCell component={"td"} onClick={handleEditTeacher}>
                {
                    editMode ?
                        <TextField
                            name={"firstName"}
                            value={teacher.firstName}
                            onChange={handleChangeName}
                        /> :
                        teacher.firstName
                }
            </TableCell>
            <TableCell component={"td"} onClick={handleEditTeacher}>
                {
                    editMode ?
                        <TextField
                            name={"lastName"}
                            value={teacher.lastName}
                            onChange={handleChangeName}
                        /> :
                        teacher.lastName
                }
            </TableCell>
            <TableCell component={"td"}>
                {
                    editMode ?
                        <>
                            <IconButton onClick={handleUpdateTeacher}>
                                <CheckIcon color={"success"}/>
                            </IconButton>
                            <IconButton onClick={() => setEditMode(false)}>
                                <CloseIcon color={"error"}/>
                            </IconButton>
                        </> :
                        <IconButton onClick={handleDeleteTeacher}>
                            {
                                props.loadingTeachers ?
                                    <CircularProgress color={"error"}/> :
                                    <DeleteForeverIcon color={"error"}/>
                            }
                        </IconButton>
                }
            </TableCell>
        </TableRow>
    )
}
