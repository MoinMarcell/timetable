import TopBar from "./components/navigation/TopBar.tsx";
import Box from "@mui/material/Box";
import {Route, Routes} from "react-router-dom";
import TeacherApp from "./components/teacher/TeacherApp.tsx";
import useTeachers from "./hooks/useTeachers.tsx";

export default function App() {

    const {teachers, addTeacher, deleteTeacher, updateTeacher} = useTeachers();

    return (
        <Box sx={{
            width: "100%",
            margin: 0,
        }}>
            <TopBar/>
            <Routes>
                <Route path={"/teachers"} element={<TeacherApp teachers={teachers} updateTeacher={updateTeacher}
                                                               deleteTeacher={deleteTeacher}
                                                               addTeacher={addTeacher}/>}/>
            </Routes>
        </Box>
    )
}
