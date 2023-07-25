import {Course} from "../models/Course.ts";
import {useCallback, useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {CourseRequest} from "../models/CourseRequest.ts";
import {toast} from "react-toastify";

export default function useCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const BASE_URL_COURSES: string = '/api/v1/courses';
    const BASE_URL_CSRF: string = '/api/v1/auth/csrf';

    const errorHandling = (text: string) => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: text,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
            timerProgressBar: true,
        }).then(() => Swal.close());
    }

    function fetchCsrfToken() {
        return axios.get(BASE_URL_CSRF)
            .then(r => r.data)
            .catch(() => {
                errorHandling("Fehler beim Laden des CSRF Tokens");
            })
            .finally(() => setLoading(false));
    }

    const fetchCourses = useCallback(() => {
        setLoading(true);
        Swal.fire({
            title: 'Kurse werden geladen...',
            didOpen: () => {
                Swal.showLoading()
                axios.get(BASE_URL_COURSES)
                    .then(r => {
                        setCourses(r.data);
                        Swal.close();
                    })
                    .catch(() => {
                        errorHandling("Fehler beim Laden der Kurse");
                    })
                    .finally(() => setLoading(false));
            }
        }).then();
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    function addCourse(course: CourseRequest) {
        setLoading(true);
        Swal.fire({
            title: 'Kurs wird hinzugefügt...',
            didOpen: () => {
                Swal.showLoading();
                fetchCsrfToken()
                    .then(r => {
                        axios.post(BASE_URL_COURSES, course, {
                            headers: {
                                "X-CSRF-TOKEN": r.token,
                            }
                        })
                            .then((r) => {
                                Swal.close();
                                fetchCourses();
                                toast.success("Kurs " + r.data.name + " erfolgreich hinzugefügt");
                            })
                            .catch(() => {
                                errorHandling("Fehler beim Hinzufügen des Kurses")
                            })
                            .finally(() => setLoading(false));
                    });
            }
        }).then()
    }

    function updateCourse(id: string, course: CourseRequest) {
        setLoading(true);
        Swal.fire({
            title: 'Kurs wird aktualisiert...',
            didOpen: () => {
                Swal.showLoading();
                fetchCsrfToken()
                    .then(r => {
                        axios.put(BASE_URL_COURSES + '/' + id, course, {
                            headers: {
                                'X-CSRF-Token': r.token,
                            }
                        })
                            .then(() => {
                                Swal.close();
                                fetchCourses();
                                toast.success("Kurs erfolgreich aktualisiert");
                            })
                            .catch(() => {
                                errorHandling("Fehler beim Aktualisieren des Kurses")
                            })
                            .finally(() => setLoading(false));
                    });
            }
        }).then()
    }

    function deleteCourse(id: string) {
        setLoading(true);
        Swal.fire({
            title: 'Kurs wird gelöscht...',
            didOpen: () => {
                Swal.showLoading();
                fetchCsrfToken()
                    .then(r => {
                        axios.delete(BASE_URL_COURSES + '/' + id, {
                            headers: {
                                'X-CSRF-Token': r.token,
                            }
                        })
                            .then(() => {
                                Swal.close();
                                fetchCourses();
                                toast.success("Kurs erfolgreich gelöscht");
                            })
                            .catch(() => {
                                errorHandling("Fehler beim Löschen des Kurses")
                            })
                            .finally(() => setLoading(false));
                    });
            }
        }).then();
    }

    return {courses, loading, addCourse, deleteCourse, updateCourse};
}