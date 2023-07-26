import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import NewCourseForm from "./NewCourseForm.tsx";
import {CourseRequest} from "../../models/CourseRequest.ts";
import {Teacher} from "../../models/Teacher.ts";

type NewCourseDialogProps = {
    open: boolean,
    onClose: () => void,
    addCourse: (course: CourseRequest) => void,
    teachers: Teacher[],
}

export default function NewCourseDialog(props: NewCourseDialogProps) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle>Neuer Kurs</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Hier kannst du einen neuen Kurs hinzufügen.
                </DialogContentText>
                <NewCourseForm
                    teachers={props.teachers}
                    addCourse={props.addCourse}
                    closeDialog={props.onClose}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Abbrechen</Button>
            </DialogActions>
        </Dialog>
    );
}