import {Teacher} from "../../models/Teacher.ts";
import TeacherTable from "./TeacherTable.tsx";
import {TeacherRequest} from "../../models/TeacherRequest.ts";
import AddTeacher from "./AddTeacher.tsx";

type TeacherAppProps = {
    teachers: Teacher[];
    addTeacher: (teacher: TeacherRequest) => Promise<void>;
    deleteTeacher: (id: string) => Promise<void>;
}

export default function TeacherApp(props: TeacherAppProps) {

    const teachers: Teacher[] = props.teachers;

    return (
        <>
            <AddTeacher addTeacher={props.addTeacher}/>
            <TeacherTable teachers={teachers} deleteTeacher={props.deleteTeacher}/>
        </>
    )
}