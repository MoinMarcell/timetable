import {TeacherRequest} from "../../models/TeacherRequest.ts";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {ChangeEvent, FormEvent, useState} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

type AddTeacherProps = {
    addTeacher: (teacher: TeacherRequest) => void;
    closeDialog: () => void;
}

export default function NewTeacherForm(props: AddTeacherProps) {

    const addTeacher = props.addTeacher;
    const [teacher, setTeacher] = useState<TeacherRequest>({firstName: "", lastName: "", salutation: ""});

    function handleChangeSalutation(event: SelectChangeEvent) {
        const value = event.target.value;
        setTeacher({...teacher, salutation: value});
    }

    function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
        setTeacher({...teacher, [event.target.name]: event.target.value})
    }

    function handleSubmitNewTeacher(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.closeDialog();
        Swal.fire({
            title: 'Hinzufügen...',
            text: 'Bitte warten...',
            didOpen() {
                Swal.showLoading()
                addTeacher(teacher);
            }
        }).then();
        setTeacher({firstName: "", lastName: "", salutation: ""})
    }

    return (
        <Box sx={{minWidth: 120, mt: 2}} component={"form"} onSubmit={handleSubmitNewTeacher}>
            <FormControl fullWidth sx={{gap: 2}}>
                <InputLabel id="salutation-select-label">Anrede</InputLabel>
                <Select
                    labelId="salutation-select-label"
                    id="salutation-select"
                    value={teacher.salutation}
                    label="Anrede"
                    onChange={handleChangeSalutation}
                >
                    <MenuItem value={"Frau"}>Frau</MenuItem>
                    <MenuItem value={"Herr"}>Herr</MenuItem>
                    <MenuItem value={"Divers"}>Divers</MenuItem>
                </Select>
                <TextField value={teacher.firstName}
                           name="firstName"
                           onChange={handleChangeName}
                           label="Vorname"
                           variant="outlined"/>
                <TextField value={teacher.lastName}
                           name="lastName"
                           onChange={handleChangeName}
                           label="Nachname"
                           variant="outlined"/>
                <Button type={"submit"}>Hinzufügen</Button>
            </FormControl>
        </Box>
    );
}
