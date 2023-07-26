import useCsrfToken from "./useCsrfToken.tsx";
import {useEffect, useState} from "react";
import {Module} from "../models/Module.ts";
import axios from "axios";
import ErrorHandling from "../components/errorHandling/ErrorHandling.tsx";
import {ModuleRequest} from "../models/ModuleRequest.ts";
import Swal from "sweetalert2";
import {toast} from "react-toastify";

export default function useModules() {

    const {csrfToken, loadingCsrfToken} = useCsrfToken();

    const [modules, setModules] = useState<Module[]>([]);
    const [loadingModules, setLoadingModules] = useState<boolean>(false);

    const BASE_URL_MODULES = "/api/v1/modules";

    function fetchModules() {
        setLoadingModules(true);
        axios.get(BASE_URL_MODULES)
            .then(response => setModules(response.data))
            .catch(() => <ErrorHandling message={"Fehler beim Laden der Module"}/>)
            .finally(() => setLoadingModules(false));
    }

    useEffect(() => {
        fetchModules();
    }, []);

    function addModule(module: ModuleRequest) {
        setLoadingModules(true);
        Swal.fire({
            title: 'Modul wird hinzugefügt...',
            didOpen: () => {
                Swal.showLoading();
                if (!loadingCsrfToken) {
                    axios.post(BASE_URL_MODULES, module, {
                        headers: {
                            "X-CSRF-TOKEN": csrfToken
                        }
                    })
                        .then(() => {
                            Swal.close();
                            fetchModules();
                            toast.success("Modul " + module.name + " erfolgreich hinzugefügt")
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Hinzufügen des Moduls"}/>)
                        .finally(() => setLoadingModules(false));
                }
            }
        }).then()
    }

    function updateModule(id: string, module: ModuleRequest) {
        setLoadingModules(true);
        Swal.fire({
            title: 'Modul wird aktualisiert...',
            didOpen: () => {
                Swal.showLoading();
                if (!loadingCsrfToken) {
                    axios.put(BASE_URL_MODULES + "/" + id, module, {
                        headers: {
                            "X-CSRF-TOKEN": csrfToken
                        }
                    })
                        .then(() => {
                            Swal.close();
                            fetchModules()
                            toast.success("Modul " + module.name + " erfolgreich aktualisiert")
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Updaten des Moduls"}/>)
                        .finally(() => setLoadingModules(false));
                }
            }
        }).then();
    }

    function deleteModule(id: string) {
        setLoadingModules(true);
        Swal.fire({
            title: 'Modul wird gelöscht...',
            didOpen: () => {
                Swal.showLoading();
                if (!loadingCsrfToken) {
                    axios.delete(BASE_URL_MODULES + "/" + id, {
                        headers: {
                            "X-CSRF-TOKEN": csrfToken
                        }
                    })
                        .then(() => {
                            Swal.close();
                            fetchModules()
                            toast.success("Modul erfolgreich gelöscht")
                        })
                        .catch(() => <ErrorHandling message={"Fehler beim Löschen des Moduls"}/>)
                        .finally(() => setLoadingModules(false));
                }
            }
        }).then();
    }

    return {modules, loadingModules, addModule, updateModule, deleteModule};
}