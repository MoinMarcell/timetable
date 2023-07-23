import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {CourseRequest} from "../../models/CourseRequest.ts";
import {FormEvent, useState} from "react";
import useTeachers from "../../hooks/useTeachers.tsx";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

type NewCourseFormProps = {
    addCourse: (course: CourseRequest) => void;
    closeDialog: () => void;
}

export default function NewCourseForm(props: NewCourseFormProps) {

    const {teachers} = useTeachers();

    const [courseRequest, setCourseRequest] = useState<CourseRequest>({
        name: "",
        amountOfStudents: 0,
        teacherId: undefined
    });

    function handleSubmitNewCourse(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.addCourse(courseRequest);
        props.closeDialog();
    }

    return (
        <Box sx={{minWidth: 120, mt: 2}} component={"form"} onSubmit={handleSubmitNewCourse}>
            <FormControl fullWidth sx={{gap: 2}}>
                <InputLabel id="teacher-select-label">Kursleitung</InputLabel>
                <Select
                    labelId="teacher-select-label"
                    id="teacher-select"
                    value={courseRequest.teacherId}
                    label="Kursleitung"
                    onChange={(event) => setCourseRequest({...courseRequest, teacherId: event.target.value})}
                >
                    <MenuItem selected value={undefined}>Keine Kursleitung</MenuItem>
                    {
                        teachers.map((teacher) => <MenuItem key={teacher.id}
                                                            value={teacher.id}>{teacher.firstName} {teacher.lastName}</MenuItem>)
                    }
                </Select>
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
    );
}
