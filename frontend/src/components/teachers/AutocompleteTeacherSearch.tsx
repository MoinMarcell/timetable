import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import {Fragment, useEffect, useState} from "react";
import {CourseRequest} from "../../models/CourseRequest.ts";
import {Teacher} from "../../models/Teacher.ts";

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

type AutocompleteTeacherSearchProps = {
    teachers: Teacher[];
    setCourseRequest: (courseRequest: CourseRequest) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    courseRequest: CourseRequest;
}

export default function AutocompleteTeacherSearch(props: AutocompleteTeacherSearchProps) {
    const [options, setOptions] = useState<readonly Teacher[]>([]);
    const loading = props.open && options.length === 0;


    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            await sleep(1e3); // For demo purposes.

            if (active) {
                setOptions([...props.teachers]);
            }
        })();

        return () => {
            active = false;
        };
    }, [loading, props.teachers]);

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    return (
        <Autocomplete
            id="asynchronous-teachers"
            open={props.open}
            onOpen={() => {
                props.setOpen(true);
            }}
            onClose={() => {
                props.setOpen(false);
            }}
            isOptionEqualToValue={(option, value) => option.firstName === value.firstName || option.lastName === value.lastName}
            getOptionLabel={(option) => option.firstName + " " + option.lastName}
            options={options}
            loading={loading}
            onChange={(event, value) => {
                event.preventDefault();
                if (value) {
                    props.setCourseRequest({...props.courseRequest, teacherId: value.id})
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Dozenten"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}