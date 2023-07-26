import {Navigate, Outlet} from "react-router-dom";

type ProtectedRoutesProps = {
    isAuthenticated: boolean,
}

export default function ProtectedRoutes(props: ProtectedRoutesProps) {

    return (
        props.isAuthenticated ?
            <Outlet/> :
            <Navigate to={"/login"}/>
    );
}