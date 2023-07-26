import CourseTable from "./CourseTable.tsx";
import useCourses from "../../hooks/useCourses.tsx";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import NewCourseDialog from "./NewCourseDialog.tsx";
import {useState} from "react";
import Button from "@mui/material/Button";
import useTeachers from "../../hooks/useTeachers.tsx";
import SearchBar from "../util/SearchBar.tsx";

export default function CourseApp() {

    const {courses, deleteCourse, addCourse, loading, updateCourse} = useCourses();
    const {teachers} = useTeachers();

    const [openNewCourseDialog, setOpenNewCourseDialog] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    function handleOpenNewCourseDialog() {
        setOpenNewCourseDialog(true);
    }

    function handleCloseNewCourseDialog() {
        setOpenNewCourseDialog(false);
    }

    const filteredCourses = courses.filter(course => {
        return course.name.toLowerCase().includes(searchTerm.toLowerCase());
    }).reverse();

    return (
        <Box
            sx={{mt: 2}}
        >
            <Container>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}>
                    <Button variant={"outlined"} onClick={handleOpenNewCourseDialog} sx={{mb: 2}}>Neuer Kurs</Button>
                    <SearchBar handleSearchTerm={setSearchTerm} placeholder={"Suche nach Kurs..."}/>
                </Box>
                <CourseTable
                    isLoading={loading}
                    teachers={teachers}
                    updateCourse={updateCourse}
                    handleDeleteCourse={deleteCourse}
                    courses={filteredCourses}
                />
            </Container>
            <NewCourseDialog
                open={openNewCourseDialog}
                onClose={handleCloseNewCourseDialog}
                teachers={teachers}
                addCourse={addCourse}
            />
        </Box>
    );
}