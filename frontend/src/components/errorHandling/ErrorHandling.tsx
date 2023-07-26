import Swal from "sweetalert2";

type ErrorHandlingProps = {
    message: string,
}

export default function ErrorHandling(props: ErrorHandlingProps) {
    const errorHandling = () => {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: props.message,
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
            timerProgressBar: true,
        }).then(() => Swal.close());
    }

    return (
        <>
            {errorHandling}
        </>
    );
}