import {useEffect, useState} from "react";
import {Teacher} from "../models/Teacher.ts";
import axios from "axios";
import {TeacherRequest} from "../models/TeacherRequest.ts";

export default function useTeachers() {

    const BASE_URL: string = '/api/v1/teachers';

    const [loading, setLoading] = useState<boolean>(false);
    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [error, setError] = useState<string>();
    const [statusCode, setStatusCode] = useState<number>();

    function fetchTeachers() {
        setLoading(true);
        axios.get(BASE_URL)
            .then(r => setTeachers(r.data))
            .catch((e) => {
                setError("Error fetching teachers");
                setStatusCode(e.response.status)
            })
            .finally(() => setLoading(false));
    }

    function addTeacher(teacher: TeacherRequest) {
        setLoading(true);
        return axios.post(BASE_URL, teacher)
            .then((r) => {
                fetchTeachers();
                setStatusCode(r.status);
            })
            .catch((e) => {
                setError("Error adding teacher");
                setStatusCode(e.response.status)
            })
            .finally(() => setLoading(false));
    }

    function updateTeacher(id: string, teacher: TeacherRequest) {
        setLoading(true);
        return axios.put(BASE_URL + '/' + id, teacher)
            .then((r) => {
                fetchTeachers();
                setStatusCode(r.status);
            })
            .catch((e) => {
                setError("Error updating teacher");
                setStatusCode(e.response.status)
            })
            .finally(() => setLoading(false));
    }

    function deleteTeacher(id: string) {
        setLoading(true);
        return axios.delete(BASE_URL + '/' + id)
            .then((r) => {
                fetchTeachers();
                setStatusCode(r.status);
            })
            .catch((e) => {
                setError("Error deleting teacher");
                setStatusCode(e.response.status)
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        fetchTeachers();
    }, []);

    return {loading, teachers, error, statusCode, addTeacher, updateTeacher, deleteTeacher};

}
