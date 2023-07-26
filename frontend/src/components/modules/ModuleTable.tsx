import {Module} from "../../models/Module.ts";
import ModuleRow from "./ModuleRow.tsx";
import Paper from "@mui/material/Paper";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {ModuleRequest} from "../../models/ModuleRequest.ts";

type ModuleTableProps = {
    modules: Module[];
    handleDeleteModule: (id: string) => void;
    isLoading: boolean;
    updateModule: (id: string, module: ModuleRequest) => void;
}

export default function ModuleTable(props: ModuleTableProps) {

    const moduleRows = props.modules.map(module =>
        <ModuleRow
            key={module.id}
            updateModule={props.updateModule}
            isLoading={props.isLoading}
            handleDeleteModule={props.handleDeleteModule}
            module={module}
        />);

    return (
        <TableContainer component={Paper}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell component={"th"}><strong>Name</strong></TableCell>
                        <TableCell component={"th"}><strong>Titel</strong></TableCell>
                        <TableCell component={"th"}><strong>Beschreibung</strong></TableCell>
                        <TableCell component={"th"}><strong>Löschen</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {moduleRows}
                </TableBody>
            </Table>
        </TableContainer>
    );
}