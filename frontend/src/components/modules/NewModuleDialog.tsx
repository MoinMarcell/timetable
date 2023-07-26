import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import NewModuleForm from "./NewModuleForm.tsx";
import {ModuleRequest} from "../../models/ModuleRequest.ts";

type NewModuleDialogProps = {
    open: boolean,
    onClose: () => void,
    addModule: (module: ModuleRequest) => void,
}

export default function NewModuleDialog(props: NewModuleDialogProps) {
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
        >
            <DialogTitle>Neues Modul</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Hier kannst du einen neues Modul hinzufügen.
                </DialogContentText>
                <NewModuleForm
                    addModule={props.addModule}
                    closeDialog={props.onClose}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Abbrechen</Button>
            </DialogActions>
        </Dialog>
    );
}