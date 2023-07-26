import ModuleTable from "./ModuleTable.tsx";
import useModules from "../../hooks/useModules.tsx";
import Box from "@mui/material/Box";
import {Container} from "@mui/material";
import NewModuleDialog from "./NewModuleDialog.tsx";
import {useState} from "react";
import Button from "@mui/material/Button";
import SearchBar from "../util/SearchBar.tsx";

export default function ModuleApp() {

    const {modules, deleteModule, addModule, loadingModules, updateModule} = useModules();

    const [openNewModuleDialog, setOpenNewModuleDialog] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    function handleOpenNewModuleDialog() {
        setOpenNewModuleDialog(true);
    }

    function handleCloseNewModuleDialog() {
        setOpenNewModuleDialog(false);
    }

    const filteredModules = modules.filter(module => {
        return module.name.toLowerCase().includes(searchTerm.toLowerCase()) || module.title.toLowerCase().includes(searchTerm.toLowerCase());
    }).reverse();

    return (
        <Box
            sx={{mt: 2}}
        >
            <Container>
                <Box sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                }}>
                    <Button variant={"outlined"} onClick={handleOpenNewModuleDialog} sx={{mb: 2}}>Neues Modul</Button>
                    <SearchBar handleSearchTerm={setSearchTerm} placeholder={"Suche nach Kurs..."}/>
                </Box>
                <ModuleTable
                    isLoading={loadingModules}
                    updateModule={updateModule}
                    handleDeleteModule={deleteModule}
                    modules={filteredModules}
                />
            </Container>
            <NewModuleDialog
                open={openNewModuleDialog}
                onClose={handleCloseNewModuleDialog}
                addModule={addModule}
            />
        </Box>
    );
}