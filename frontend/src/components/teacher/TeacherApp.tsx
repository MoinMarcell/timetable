import {Teacher} from "../../models/Teacher.ts";
import TeacherTable from "./TeacherTable.tsx";
import {TeacherRequest} from "../../models/TeacherRequest.ts";
import NewTeacherDialog from "./NewTeacherDialog.tsx";
import {useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";

type TeacherAppProps = {
    teachers: Teacher[];
    addTeacher: (teacher: TeacherRequest) => Promise<void>;
    deleteTeacher: (id: string) => Promise<void>;
    updateTeacher: (id: string, teacher: TeacherRequest) => Promise<void>;
}

export default function TeacherApp(props: TeacherAppProps) {

    const teachers: Teacher[] = props.teachers;
    const [open, setOpen] = useState<boolean>(false);

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <Box sx={{mt: 2}}>
            <Container>
                <Button sx={{mb: 2}} onClick={handleOpen} variant={"outlined"}>Neuer Dozent</Button>
                <TeacherTable teachers={teachers} updateTeacher={props.updateTeacher}
                              deleteTeacher={props.deleteTeacher}/>
                <NewTeacherDialog open={open} onClose={handleClose} addTeacher={props.addTeacher}/>
            </Container>
        </Box>
    )
}
