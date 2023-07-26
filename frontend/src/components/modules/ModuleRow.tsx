import {Module} from "../../models/Module.ts";
import {CircularProgress, TableCell, TableRow, TextField} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import IconButton from "@mui/material/IconButton";
import Swal from "sweetalert2";
import {useState} from "react";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {ModuleRequest} from "../../models/ModuleRequest.ts";

type ModuleRowProps = {
    module: Module;
    handleDeleteModule: (id: string) => void;
    isLoading: boolean;
    updateModule: (id: string, Module: ModuleRequest) => void;
}

export default function ModuleRow(props: ModuleRowProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [moduleToEdit, setModuleToEdit] = useState<ModuleRequest>({
        name: props.module.name,
        title: props.module.title,
        description: props.module.description,
    });

    function handleDeleteModuleButtonClick() {
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst diesen Modul nicht wiederherstellen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja, löschen!',
            cancelButtonText: 'Abbrechen'

        }).then((result) => {
            if (result.isConfirmed) {
                props.handleDeleteModule(props.module.id);
            }
        }).then()
    }

    function handleEditModuleButtonClick() {
        Swal.fire({
            title: 'Bist du sicher?',
            text: "Du kannst die Änderungen nicht rückgängig machen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ja, speichern!',
            cancelButtonText: 'Abbrechen'
        }).then((result) => {
            if (result.isConfirmed) {
                props.updateModule(props.module.id, moduleToEdit);
                setEditMode(false);
            }
            if (result.isDismissed) {
                setEditMode(false);
            }
        });
    }

    return (
        <TableRow>
            <TableCell
                component={"td"}
                onClick={() => setEditMode(true)}
            >
                {
                    editMode ?
                        <TextField
                            label={"Modulname"}
                            variant="outlined"
                            value={moduleToEdit.name}
                            onChange={(event) => setModuleToEdit({...moduleToEdit, name: event.target.value})}
                        /> :
                        props.module.name
                }
            </TableCell>
            <TableCell
                component={"td"}
                onClick={() => setEditMode(true)}
            >
                {
                    editMode ?
                        <TextField
                            label="Modultitel"
                            variant="outlined"
                            value={moduleToEdit.title}
                            onChange={(event) => setModuleToEdit({
                                ...moduleToEdit,
                                title: event.target.value
                            })}
                        /> :
                        props.module.title
                }
            </TableCell>
            <TableCell
                component={"td"}
                onClick={() => setEditMode(true)}
            >
                {
                    editMode ?
                        <TextField
                            label="Modulbeschreibung"
                            variant="outlined"
                            value={moduleToEdit.description}
                            onChange={(event) => setModuleToEdit({
                                ...moduleToEdit,
                                description: event.target.value
                            })}
                        /> :
                        props.module.description
                }
            </TableCell>
            <TableCell component={"td"}>
                {
                    editMode ?
                        <>
                            <IconButton onClick={handleEditModuleButtonClick}>
                                <CheckIcon color={"success"}/>
                            </IconButton>
                            <IconButton onClick={() => setEditMode(false)}>
                                <CloseIcon color={"error"}/>
                            </IconButton>
                        </> :
                        <IconButton onClick={handleDeleteModuleButtonClick}>
                            {
                                props.isLoading ?
                                    <CircularProgress color={"error"}/> :
                                    <DeleteForeverIcon color={"error"}/>
                            }
                        </IconButton>
                }
            </TableCell>
        </TableRow>
    );
}