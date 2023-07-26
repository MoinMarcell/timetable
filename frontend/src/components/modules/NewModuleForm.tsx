import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import {ModuleRequest} from "../../models/ModuleRequest.ts";
import {FormEvent, useState} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

type NewModuleFormProps = {
    addModule: (module: ModuleRequest) => void;
    closeDialog: () => void;
}

export default function NewModuleForm(props: NewModuleFormProps) {

    const [moduleRequest, setModuleRequest] = useState<ModuleRequest>({
        name: "",
        title: "",
        description: "",
    });

    function handleSubmitNewModule(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        props.addModule(moduleRequest);
        props.closeDialog();
    }

    return (
        <Box sx={{minWidth: 120, mt: 2}} component={"form"} onSubmit={handleSubmitNewModule}>
            <FormControl fullWidth sx={{gap: 2}}>
                <TextField
                    label="Modulname"
                    variant="outlined"
                    value={moduleRequest.name}
                    onChange={(event) => setModuleRequest({...moduleRequest, name: event.target.value})}
                />
                <TextField
                    label="Modultitel"
                    variant="outlined"
                    value={moduleRequest.title}
                    onChange={(event) => setModuleRequest({
                        ...moduleRequest,
                        title: event.target.value
                    })}
                />
                <TextField
                    label="Modulbeschreibung"
                    variant="outlined"
                    value={moduleRequest.description}
                    onChange={(event) => setModuleRequest({
                        ...moduleRequest,
                        description: event.target.value
                    })}
                />
                <Button variant="contained" type={"submit"}>Hinzufügen</Button>
            </FormControl>
        </Box>
    )
        ;
}
