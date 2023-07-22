import {Teacher} from "../../models/Teacher.ts";
import {TableCell, TableRow, TextField} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2'
import {ChangeEvent, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import {TeacherRequest} from "../../models/TeacherRequest.ts";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type TeacherCardProps = {
    teacher: Teacher;
    deleteTeacher: (id: string) => Promise<void>;
    updateTeacher: (id: string, teacher: TeacherRequest) => Promise<void>;
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
                Swal.fire({
                    title: 'Löschen...',
                    text: 'Bitte warten...',
                    didOpen() {
                        Swal.showLoading()
                        props.deleteTeacher(teacher.id)
                            .then(() => {
                                Swal.fire({
                                    title: 'Gelöscht!',
                                    text: teacher.firstName + ' ' + teacher.lastName + ' wurde gelöscht.',
                                    icon: 'success',
                                }).then()
                            });
                    }
                }).then();
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
                Swal.fire({
                    title: 'Speichern...',
                    text: 'Bitte warten...',
                    didOpen() {
                        Swal.showLoading()
                        props.updateTeacher(teacher.id, teacher)
                            .then(() => {
                                Swal.fire({
                                    title: 'Gespeichert!',
                                    text: teacher.firstName + ' ' + teacher.lastName + ' wurde gespeichert.',
                                    icon: 'success',
                                }).then()
                            });
                    }
                }).then();
                setEditMode(false);
            }
            setEditMode(false);
        })
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
                            <CheckIcon onClick={handleUpdateTeacher} color={"success"}/>
                            <CloseIcon onClick={() => setEditMode(false)} color={"error"}/>
                        </> :
                        <DeleteForeverIcon onClick={handleDeleteTeacher} color={"error"}/>
                }
            </TableCell>
        </TableRow>
    )
}