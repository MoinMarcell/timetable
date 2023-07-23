import {Course} from "../../models/Course.ts";
import CourseRow from "./CourseRow.tsx";
import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {CourseRequest} from "../../models/CourseRequest.ts";

type CourseTableProps = {
    courses: Course[];
    handleDeleteCourse: (id: string) => void;
    isLoading: boolean;
    updateCourse: (id: string, course: CourseRequest) => void;
}

export default function CourseTable(props: CourseTableProps) {

    const courseRows = props.courses.map(course =>
        <CourseRow
            key={course.id}
            updateCourse={props.updateCourse}
            isLoading={props.isLoading}
            handleDeleteCourse={props.handleDeleteCourse}
            course={course}
        />);

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell component={"th"}><strong>Name</strong></TableCell>
                        <TableCell component={"th"}><strong>Anzahl Schüler</strong></TableCell>
                        <TableCell component={"th"}><strong>Dozent</strong></TableCell>
                        <TableCell component={"th"}><strong>Löschen</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {courseRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}