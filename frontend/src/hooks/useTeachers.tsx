import {useCallback, useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {toast} from "react-toastify";
import {TeacherRequest} from "../models/TeacherRequest.ts";
import useCsrfToken from "./useCsrfToken.tsx";
import ErrorHandling from "../components/errorHandling/ErrorHandling.tsx";
import {Teacher} from "../models/Teacher.ts";

export default function useTeachers() {

    const {csrfToken, loadingCsrfToken} = useCsrfToken();

    const [teachers, setTeachers] = useState<Teacher[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const BASE_URL_TEACHERS: string = '/api/v1/teachers';


    const fetchTeachers = useCallback(() => {
        setLoading(true);
        Swal.fire({
            title: 'Dozenten werden geladen...',
            didOpen: () => {
                Swal.showLoading()
                axios.get(BASE_URL_TEACHERS)
                    .then(r => {
                        setTeachers(r.data);
                        Swal.close();
                    })
                    .catch(() => <ErrorHandling message={"Fehler beim Laden der Dozenten"}/>)
                    .finally(() => setLoading(false));
            }
        }).then();
    }, []);

    useEffect(() => {
        fetchTeachers();
    }, [fetchTeachers]);

    function addTeacher(teacher: TeacherRequest) {
        setLoading(true);
        Swal.fire({
            title: 'Dozent wird hinzugefügt...',
            didOpen: () => {
                Swal.showLoading();
                if (!loadingCsrfToken) {
                    axios.post(BASE_URL_TEACHERS, teacher, {
                        headers: {
                            "X-CSRF-TOKEN": csrfToken,
                        }
                    })
                        .then((r) => {
                            Swal.close();
                            fetchTeachers();
                            toast.success("Dozent " + r.data.firstName + " " + r.data.lastName + " erfolgreich hinzugefügt");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Hinzufügen des Dozenten"}/>)
                        .finally(() => setLoading(false));
                }
            }
        }).then()
        console.log(csrfToken)
    }

    function updateTeacher(id: string, teacher: TeacherRequest) {
        setLoading(true);
        Swal.fire({
            title: 'Dozent wird aktualisiert...',
            didOpen: () => {
                Swal.showLoading();
                if (!loadingCsrfToken) {
                    axios.put(BASE_URL_TEACHERS + '/' + id, teacher, {
                        headers: {
                            'X-CSRF-Token': csrfToken,
                        }
                    })
                        .then(() => {
                            Swal.close();
                            fetchTeachers();
                            toast.success("Dozent erfolgreich aktualisiert");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Aktualisieren des Dozent"}/>)
                        .finally(() => setLoading(false));
                }
            }
        }).then()
    }

    function deleteTeacher(id: string) {
        setLoading(true);
        Swal.fire({
            title: 'Dozent wird gelöscht...',
            didOpen: () => {
                Swal.showLoading();
                if (!loadingCsrfToken) {
                    axios.delete(BASE_URL_TEACHERS + '/' + id, {
                        headers: {
                            'X-CSRF-Token': csrfToken,
                        }
                    })
                        .then(() => {
                            Swal.close();
                            fetchTeachers();
                            toast.success("Dozent erfolgreich gelöscht");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Löschen des Dozent"}/>)
                        .finally(() => setLoading(false));
                }
            }
        }).then();
    }

    return {teachers, loading, addTeacher, updateTeacher, deleteTeacher};
}