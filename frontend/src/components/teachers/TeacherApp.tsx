import TeacherTable from "./TeacherTable.tsx";
import NewTeacherDialog from "./NewTeacherDialog.tsx";
import {useState} from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import useTeachers from "../../hooks/useTeachers.tsx";
import SearchBar from "../util/SearchBar.tsx";

export default function TeacherApp() {

    const {teachers, addTeacher, deleteTeacher, updateTeacher, loading} = useTeachers();
    const [open, setOpen] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    const filteredTeachers = teachers.filter(teacher => {
        return teacher.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || teacher.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    }).reverse();

    return (
        <Box sx={{mt: 2}}>
            <Container>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}>
                    <Button sx={{mb: 2}} onClick={handleOpen} variant={"outlined"}>Neuer Dozent</Button>
                    <SearchBar handleSearchTerm={setSearchTerm} placeholder={"Suche nach Dozent..."}/>
                </Box>
                <TeacherTable teachers={filteredTeachers} updateTeacher={updateTeacher}
                              deleteTeacher={deleteTeacher} loadingTeachers={loading}/>
                <NewTeacherDialog open={open} onClose={handleClose} addTeacher={addTeacher}/>
            </Container>
        </Box>
    )
}
