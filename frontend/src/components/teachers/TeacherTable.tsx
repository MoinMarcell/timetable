import {Teacher} from "../../models/Teacher.ts";
import TeacherRow from "./TeacherRow.tsx";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from "@mui/material/Paper";
import {TeacherRequest} from "../../models/TeacherRequest.ts";

type TeacherTableProps = {
    teachers: Teacher[];
    deleteTeacher: (id: string) => void;
    updateTeacher: (id: string, teacher: TeacherRequest) => void;
    loadingTeachers: boolean;
}

export default function TeacherTable(props: TeacherTableProps) {

    const teachers: Teacher[] = props.teachers;
    const teacherRows = teachers.map((teacher) => <TeacherRow key={teacher.id} loadingTeachers={props.loadingTeachers}
                                                              updateTeacher={props.updateTeacher}
                                                              deleteTeacher={props.deleteTeacher}
                                                              teacher={teacher}/>)

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell component={"th"}><strong>Anrede</strong></TableCell>
                        <TableCell component={"th"}><strong>Vorname</strong></TableCell>
                        <TableCell component={"th"}><strong>Nachname</strong></TableCell>
                        <TableCell component={"th"}><strong>Löschen</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teacherRows}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
