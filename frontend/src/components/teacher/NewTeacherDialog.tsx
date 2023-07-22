import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import NewTeacherForm from "./NewTeacherForm.tsx";
import {TeacherRequest} from "../../models/TeacherRequest.ts";

type NewTeacherDialogProps = {
    open: boolean,
    onClose: () => void,
    addTeacher: (teacher: TeacherRequest) => Promise<void>,
}

export default function NewTeacherDialog(props: NewTeacherDialogProps) {

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Neuer Dozent</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Hier kannst du einen neuen Dozenten hinzufügen.
                </DialogContentText>
                <NewTeacherForm closeDialog={props.onClose} addTeacher={props.addTeacher}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Abbrechen</Button>
            </DialogActions>
        </Dialog>
    );
}
