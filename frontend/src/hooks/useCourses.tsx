import {Course} from "../models/Course.ts";
import {useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {CourseRequest} from "../models/CourseRequest.ts";
import {toast} from "react-toastify";

export default function useCourses() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    function fetchCourses() {
        setLoading(true);
        Swal.fire({
            title: 'Kurse werden geladen...',
            didOpen: () => {
                Swal.showLoading()
                axios.get('/api/v1/courses')
                    .then(r => {
                        setCourses(r.data);
                        Swal.close();
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Fehler beim Laden der Kurse',
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        }).then(() => Swal.close());
                    })
                    .finally(() => setLoading(false));
            }
        }).then();
    }

    useEffect(() => {
        fetchCourses();
    }, []);

    function addCourse(course: CourseRequest) {
        setLoading(true);
        Swal.fire({
            title: 'Kurs wird hinzugefügt...',
            didOpen: () => {
                Swal.showLoading();
                axios.get('/api/v1/auth/csrf')
                    .then(r => {
                        axios.post('/api/v1/courses', course, {
                            headers: {
                                'X-CSRF-Token': r.data.token,
                            }
                        })
                            .then((r) => {
                                Swal.close();
                                fetchCourses();
                                toast.success("Kurs " + r.data.name + " erfolgreich hinzugefügt");
                            })
                            .catch(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Fehler beim Hinzufügen des Kurses',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                    timer: 2000,
                                    timerProgressBar: true,
                                }).then(() => Swal.close());
                            })
                            .finally(() => setLoading(false));
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Fehler beim Laden des CSRF Tokens',
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        }).then(() => Swal.close());
                    })
                    .finally(() => setLoading(false));
            }
        }).then()
    }

    function updateCourse(id: string, course: CourseRequest) {
        setLoading(true);
        Swal.fire({
            title: 'Kurs wird aktualisiert...',
            didOpen: () => {
                Swal.showLoading();
                axios.get('/api/v1/auth/csrf')
                    .then(r => {
                        axios.put('/api/v1/courses/' + id, course, {
                            headers: {
                                'X-CSRF-Token': r.data.token,
                            }
                        })
                            .then(() => {
                                Swal.close();
                                fetchCourses();
                                toast.success("Kurs erfolgreich aktualisiert");
                            })
                            .catch(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Fehler beim Aktualisieren des Kurses',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                    timer: 2000,
                                    timerProgressBar: true,
                                }).then(() => Swal.close());
                            })
                            .finally(() => setLoading(false));
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Fehler beim Laden des CSRF Tokens',
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        }).then(() => Swal.close());
                    })
                    .finally(() => setLoading(false));
            }
        }).then()
    }

    function deleteCourse(id: string) {
        setLoading(true);
        Swal.fire({
            title: 'Kurs wird gelöscht...',
            didOpen: () => {
                Swal.showLoading();
                axios.get('/api/v1/auth/csrf')
                    .then(r => {
                        axios.delete('/api/v1/courses/' + id, {
                            headers: {
                                'X-CSRF-Token': r.data.token,
                            }
                        })
                            .then(() => {
                                Swal.close();
                                fetchCourses();
                                toast.success("Kurs erfolgreich gelöscht");
                            })
                            .catch(() => {
                                Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Fehler beim Löschen des Kurses',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                    timer: 2000,
                                    timerProgressBar: true,
                                }).then(() => Swal.close());
                            })
                            .finally(() => setLoading(false));
                    })
                    .catch(() => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Fehler beim Laden des CSRF Tokens',
                            showConfirmButton: false,
                            showCancelButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                        }).then(() => Swal.close());
                    })
                    .finally(() => setLoading(false));
            }
        }).then();
    }

    return {courses, loading, addCourse, deleteCourse, updateCourse};
}