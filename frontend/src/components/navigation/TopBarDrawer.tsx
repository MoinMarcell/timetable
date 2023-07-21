import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";

type TopBarDrawerProps = {
    open: boolean,
    onClose: () => void,
}

export default function TopBarDrawer(props: TopBarDrawerProps) {

    const navigate = useNavigate();

    function handleTeacherClick() {
        navigate("/teachers");
    }

    return (
        <Paper sx={{width: 320, maxWidth: '100%'}}>
            <Drawer
                open={props.open}
                onClose={props.onClose}
            >
                <MenuList>
                    <MenuItem onClick={handleTeacherClick}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small"/>
                        </ListItemIcon>
                        <ListItemText>Lehrer</ListItemText>
                    </MenuItem>
                </MenuList>
            </Drawer>
        </Paper>
    );
}