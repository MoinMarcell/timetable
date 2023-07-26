import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {CourseRequest} from "../../models/CourseRequest.ts";
import {FormEvent, useState} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {Teacher} from "../../models/Teacher.ts";
import AutocompleteTeacherSearch from "../teachers/AutocompleteTeacherSearch.tsx";

type NewCourseFormProps = {
    addCourse: (course: CourseRequest) => void;
    closeDialog: () => void;
    teachers: Teacher[];
}

export default function NewCourseForm(props: NewCourseFormProps) {

    const [courseRequest, setCourseRequest] = useState<CourseRequest>({
        name: "",
        amountOfStudents: 0,
        teacherId: "",
    });

    function handleSubmitNewCourse(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.addCourse(courseRequest);
        props.closeDialog();
    }

    const [open, setOpen] = useState(false);

    return (
        <Box sx={{minWidth: 120, mt: 2}} component={"form"} onSubmit={handleSubmitNewCourse}>
            <FormControl fullWidth sx={{gap: 2}}>
                <AutocompleteTeacherSearch teachers={props.teachers} setCourseRequest={setCourseRequest} open={open}
                                           setOpen={setOpen} courseRequest={courseRequest}/>
                <TextField
                    label="Kursname"
                    variant="outlined"
                    value={courseRequest.name}
                    onChange={(event) => setCourseRequest({...courseRequest, name: event.target.value})}
                />
                <TextField
                    inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
                    label="Anzahl Studenten"
                    variant="outlined"
                    value={courseRequest.amountOfStudents}
                    onChange={(event) => setCourseRequest({
                        ...courseRequest,
                        amountOfStudents: Number(event.target.value)
                    })}
                />
                <Button variant="contained" type={"submit"}>Hinzufügen</Button>
            </FormControl>
        </Box>
    )
        ;
}
