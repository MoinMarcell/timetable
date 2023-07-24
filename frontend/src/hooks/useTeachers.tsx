import {useEffect, useState} from "react";
import {Teacher} from "../models/Teacher.ts";
import axios from "axios";
import {TeacherRequest} from "../models/TeacherRequest.ts";
import {toast} from "react-toastify";

export default function useTeachers() {

    const BASE_URL: string = '/api/v1/teachers';

    const [loading, setLoading] = useState<boolean>(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [error, setError] = useState<string>();

    function fetchTeachers() {
        setLoading(true);
        axios.get(BASE_URL)
            .then(r => setTeachers(r.data))
            .catch(() => {
                setError("Error fetching teachers");
            })
            .finally(() => setLoading(false));
    }

    function addTeacher(teacher: TeacherRequest) {
        setLoading(true);
        return axios.get("/api/v1/auth/csrf")
            .then(r => {
                axios.post(BASE_URL, teacher, {
                    headers: {
                        "X-CSRF-Token": r.data.token,
                    }
                })
                    .then(() => {
                        fetchTeachers();
                    })
                    .catch(() => {
                        setError("Error adding teacher");
                    })

            })
            .catch(() => {
                setError("Error fetching CSRF token");
                toast.error("Error fetching CSRF token");
            })
            .finally(() => setLoading(false));
    }

    function updateTeacher(id: string, teacher: TeacherRequest) {
        setLoading(true);
        return axios.get("/api/v1/auth/csrf")
            .then(r => {
                axios.put(BASE_URL + '/' + id, teacher, {
                    headers: {
                        "X-CSRF-Token": r.data.token,
                    }
                })
                    .then(() => {
                        fetchTeachers();
                    })
                    .catch(() => {
                        setError("Error updating teacher");
                    })
            })
            .catch(() => {
                setError("Error fetching CSRF token");
                toast.error("Error fetching CSRF token");
            })
            .finally(() => setLoading(false));
    }

    function deleteTeacher(id: string) {
        setLoading(true);
        return axios.get("/api/v1/auth/csrf")
            .then(r => {
                axios.delete(BASE_URL + '/' + id, {
                    headers: {
                        "X-CSRF-Token": r.data.token,
                    }
                })
                    .then(() => {
                        fetchTeachers();
                    })
                    .catch(() => {
                        setError("Error deleting teacher");
                    });
            })
            .catch(() => {
                setError("Error fetching CSRF token");
                toast.error("Error fetching CSRF token");
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchTeachers();
    }, []);

    return {loading, teachers, error, addTeacher, updateTeacher, deleteTeacher};

}
