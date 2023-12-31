import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import TopBarDrawer from "./TopBarDrawer.tsx";
import {useState} from "react";

type TopBarProps = {
    logout: () => void,
    isAuthenticated: boolean,
}

export default function TopBar(props: TopBarProps) {

    const [open, setOpen] = useState(false);

    function closeTopBarDrawer() {
        setOpen(false);
    }

    function openTopBarDrawer() {
        setOpen(true);
    }

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                        onClick={openTopBarDrawer}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Timetable
                    </Typography>
                    {
                        props.isAuthenticated && <Button color="inherit" onClick={props.logout}>Logout</Button>
                    }

                </Toolbar>
            </AppBar>
            <TopBarDrawer open={open} onClose={closeTopBarDrawer}/>
        </Box>
    );
}