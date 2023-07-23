import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export default function UseLogin() {

    const [username, setUsername] = useState("anonymous");
    const [loginLoading, setLoginLoading] = useState(true);

    const navigate = useNavigate();

    const isAuthenticated: boolean =
        username !== "" &&
        username !== undefined &&
        username !== "anonymous";

    function login(username: string, password: string) {
        axios.get("/api/v1/auth/csrf")
            .then(r => {
                axios.post("/api/v1/auth/login", {}, {
                    auth: {
                        username: username,
                        password: password,
                    },
                    headers: {
                        "X-CSRF-Token": r.data.token,
                    }
                })
                    .then(r => {
                        setUsername(r.data);
                        toast.success("Willkommen zurück, " + r.data + "!");
                        navigate("/");
                    })
                    .catch(() => {
                        Swal.fire({
                            title: "Hoppla, da ist etwas schiefgelaufen",
                            text: "Bitte überprüfe deine Eingaben",
                            icon: "error",
                            timer: 3000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            willClose() {
                            },
                        }).then()
                    });
            })
            .catch(() => {
                toast.error("Hoppla, da ist etwas schiefgelaufen");
            })
            .finally(() => setLoginLoading(false));
    }

    function logout() {
        axios.get("/api/v1/auth/csrf")
            .then(r => {
                axios.post("/api/v1/auth/logout", {}, {
                    headers: {
                        "X-CSRF-Token": r.data.token,
                    }
                })
                    .then(() => {
                        setUsername("anonymous");
                        toast.success("Du wurdest abgemeldet");
                    })
                    .catch(() => {
                        toast.error("Hoppla, da ist etwas schiefgelaufen");
                    });
            })
            .catch(() => {
                toast.error("Hoppla, da ist etwas schiefgelaufen");
            })
            .finally(() => setLoginLoading(false));
    }

    useEffect(() => {
        axios.get("/api/v1/auth/me")
            .then(r => {
                setUsername(r.data)
            })
            .catch(() => setUsername("anonymous"))
            .finally(() => setLoginLoading(false));
    }, []);

    return {username, login, logout, isAuthenticated, loginLoading}
}