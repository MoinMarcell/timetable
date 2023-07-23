import TeacherTable from "./TeacherTable.tsx";
import NewTeacherDialog from "./NewTeacherDialog.tsx";
import {useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import useTeachers from "../../hooks/useTeachers.tsx";


export default function TeacherApp() {

    const {teachers, addTeacher, deleteTeacher, updateTeacher} = useTeachers();
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
                <TeacherTable teachers={teachers} updateTeacher={updateTeacher}
                              deleteTeacher={deleteTeacher}/>
                <NewTeacherDialog open={open} onClose={handleClose} addTeacher={addTeacher}/>
            </Container>
        </Box>
    )
}
