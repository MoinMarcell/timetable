import {Teacher} from "../../models/Teacher.ts";
import {TableCell, TableRow} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2'

type TeacherCardProps = {
    teacher: Teacher;
    deleteTeacher: (id: string) => Promise<void>;
}

export default function TeacherRow(props: TeacherCardProps) {

    const teacher: Teacher = props.teacher;

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

    return (
        <TableRow>
            <TableCell component={"td"}>{teacher.salutation}</TableCell>
            <TableCell component={"td"}>{teacher.firstName}</TableCell>
            <TableCell component={"td"}>{teacher.lastName}</TableCell>
            <TableCell component={"td"}><DeleteForeverIcon onClick={handleDeleteTeacher} color={"error"}/></TableCell>
        </TableRow>
    )
}