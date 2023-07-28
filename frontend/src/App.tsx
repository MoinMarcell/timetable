import TopBar from "./components/navigation/TopBar.tsx";
import Box from "@mui/material/Box";
import {Route, Routes} from "react-router-dom";
import TeacherApp from "./components/teachers/TeacherApp.tsx";
import ProtectedRoutes from "./auth/ProtectedRoutes.tsx";
import UseLogin from "./auth/useLogin.tsx";
import LoginPage from "./auth/LoginPage.tsx";
import LoadSpinner from "./components/loadSpinner/LoadSpinner.tsx";
import CourseApp from "./components/courses/CourseApp.tsx";
import ModuleApp from "./components/modules/ModuleApp.tsx";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export default function App() {

    const {login, logout, isAuthenticated, loginLoading} = UseLogin();

    if (loginLoading) return (<LoadSpinner/>);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Box sx={{
                width: "100%",
                margin: 0,
            }}>
                {isAuthenticated && <TopBar isAuthenticated={isAuthenticated} logout={logout}/>}
                <Routes>
                    <Route path={"/login"} element={<LoginPage loading={loginLoading} login={login}/>}/>
                    <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}/>}>
                        <Route path={"/"} element={<p>Home</p>}/>
                        <Route
                            path={"/teachers"}
                            element={
                                <TeacherApp/>
                            }
                        />
                        <Route
                            path={"/courses"}
                            element={
                                <CourseApp/>
                            }
                        />
                        <Route
                            path={"/modules"}
                            element={
                                <ModuleApp/>
                            }
                        />
                    </Route>
                </Routes>
            </Box>
        </ThemeProvider>
    )
}
