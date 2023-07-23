import Box from "@mui/material/Box";
import "./LoadSpinner.css";

export default function LoadSpinner() {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            backgroundColor: "#1b1b1b",
        }}>
            <span className="loader">L &nbsp; ading</span>
        </Box>
    );
}