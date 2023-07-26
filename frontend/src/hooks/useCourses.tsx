import {Course} from "../models/Course.ts";
import {useCallback, useEffect, useState} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import {CourseRequest} from "../models/CourseRequest.ts";
import {toast} from "react-toastify";
import useCsrfToken from "./useCsrfToken.tsx";
import ErrorHandling from "../components/errorHandling/ErrorHandling.tsx";

export default function useCourses() {

    const {csrfToken, loadingCsrfToken} = useCsrfToken();

    const [courses, setCourses] = useState<Course[]>([]);
    const [loadingCourses, setLoadingCourses] = useState<boolean>(false);

    const BASE_URL_COURSES: string = '/api/v1/courses';

    const fetchCourses = useCallback(() => {
        setLoadingCourses(true);
        Swal.fire({
            title: 'Kurse werden geladen...',
            didOpen: () => {
                Swal.showLoading()
                axios.get(BASE_URL_COURSES)
                    .then(r => {
                        setCourses(r.data);
                        Swal.close();
                    })
                    .catch(() => <ErrorHandling message={"Fehler beim Laden der Kurse"}/>)
                    .finally(() => setLoadingCourses(false));
            }
        }).then();
    }, []);

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    function addCourse(course: CourseRequest) {
        setLoadingCourses(true);
        Swal.fire({
            title: 'Kurs wird hinzugefügt...',
            didOpen: () => {
                Swal.showLoading();
                if (!loadingCsrfToken) {
                    axios.post(BASE_URL_COURSES, course.teacherId ? course : {
                        name: course.name,
                        amountOfStudents: course.amountOfStudents
                    }, {
                        headers: {
                            "X-CSRF-TOKEN": csrfToken,
                        }
                    })
                        .then((r) => {
                            Swal.close();
                            fetchCourses();
                            toast.success("Kurs " + r.data.name + " erfolgreich hinzugefügt");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Hinzufügen des Kurses"}/>)
                        .finally(() => setLoadingCourses(false));
                }
            }
        }).then()
    }

    function updateCourse(id: string, course: CourseRequest) {
        setLoadingCourses(true);
        Swal.fire({
            title: 'Kurs wird aktualisiert...',
            didOpen: () => {
                Swal.showLoading();
                if (!loadingCsrfToken) {
                    axios.put(BASE_URL_COURSES + '/' + id, course, {
                        headers: {
                            'X-CSRF-Token': csrfToken,
                        }
                    })
                        .then(() => {
                            Swal.close();
                            fetchCourses();
                            toast.success("Kurs erfolgreich aktualisiert");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Aktualisieren des Kurses"}/>)
                        .finally(() => setLoadingCourses(false));
                }
            }
        }).then()
    }

    function deleteCourse(id: string) {
        setLoadingCourses(true);
        Swal.fire({
            title: 'Kurs wird gelöscht...',
            didOpen: () => {
                Swal.showLoading();
                if (!loadingCsrfToken) {
                    axios.delete(BASE_URL_COURSES + '/' + id, {
                        headers: {
                            'X-CSRF-Token': csrfToken,
                        }
                    })
                        .then(() => {
                            Swal.close();
                            fetchCourses();
                            toast.success("Kurs erfolgreich gelöscht");
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Löschen des Kurses"}/>)
                        .finally(() => setLoadingCourses(false));
                }
            }
        }).then();
    }

    return {courses, loading: loadingCourses, addCourse, deleteCourse, updateCourse};
}