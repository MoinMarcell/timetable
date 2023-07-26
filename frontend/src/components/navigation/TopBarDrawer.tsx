import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import {useNavigate} from "react-router-dom";

type TopBarDrawerProps = {
    open: boolean,
    onClose: () => void,
}

export default function TopBarDrawer(props: TopBarDrawerProps) {

    const navigate = useNavigate();

    function handleTeacherClick() {
        navigate("/teachers");
        props.onClose();
    }

    function handleHomeClick() {
        navigate("/");
        props.onClose();
    }

    function handleCourseClick() {
        navigate("/courses");
        props.onClose();
    }

    return (
        <Paper sx={{width: 320, maxWidth: '100%'}}>
            <Drawer
                open={props.open}
                onClose={props.onClose}
            >
                <MenuItem onClick={handleHomeClick}>
                    <ListItemIcon>
                        <HomeIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Startseite</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleTeacherClick}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Dozenten</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleCourseClick}>
                    <ListItemIcon>
                        <ClassIcon fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Kurse</ListItemText>
                </MenuItem>
            </Drawer>
        </Paper>
    );
}