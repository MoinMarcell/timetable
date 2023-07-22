import TopBar from "./components/navigation/TopBar.tsx";
import Box from "@mui/material/Box";
import {Route, Routes} from "react-router-dom";
import TeacherApp from "./components/teacher/TeacherApp.tsx";
import ProtectedRoutes from "./components/auth/ProtectedRoutes.tsx";
import UseLogin from "./components/auth/useLogin.tsx";
import LoginPage from "./components/auth/LoginPage.tsx";

export default function App() {

    const {login, logout, isAuthenticated, loading} = UseLogin();

    return (
        <Box sx={{
            width: "100%",
            margin: 0,
        }}>
            {isAuthenticated && <TopBar isAuthenticated={isAuthenticated} logout={logout}/>}
            <Routes>
                <Route path={"/login"} element={<LoginPage loading={loading} login={login}/>}/>
                <Route element={<ProtectedRoutes isAuthenticated={isAuthenticated}/>}>
                    <Route path={"/"} element={<p>Home</p>}/>
                    <Route
                        path={"/teachers"}
                        element={
                            <TeacherApp/>
                        }
                    />
                </Route>
            </Routes>
        </Box>
    )
}
