import {useEffect, useState} from "react";
import axios from "axios";
import ErrorHandling from "../components/errorHandling/ErrorHandling.tsx";

export default function useCsrfToken() {

    const [csrfToken, setCsrfToken] = useState<string>('');
    const [loadingCsrfToken, setLoadingCsrfToken] = useState<boolean>(false);

    const BASE_URL_CSRF: string = '/api/v1/auth/csrf';

    function fetchCsrfToken() {
        setLoadingCsrfToken(true);
        axios.get(BASE_URL_CSRF)
            .then(r => setCsrfToken(r.data.token))
            .catch(() => <ErrorHandling message={"Fehler beim Laden des CsrfToken"}/>)
            .finally(() => setLoadingCsrfToken(false));
    }

    useEffect(() => {
        fetchCsrfToken();
    }, []);

    return {csrfToken, loadingCsrfToken};

}