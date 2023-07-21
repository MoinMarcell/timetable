import TopBar from "./components/navigation/TopBar.tsx";
import Box from "@mui/material/Box";

export default function App() {
    return (
        <Box sx={{
            width: "100%",
            margin: 0,
        }}>
            <TopBar/>
        </Box>
    )
}
