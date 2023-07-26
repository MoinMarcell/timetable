import CourseTable from "./CourseTable.tsx";
import useCourses from "../../hooks/useCourses.tsx";
import Box from "@mui/material/Box";
import {alpha, Container, InputBase, styled} from "@mui/material";
import NewCourseDialog from "./NewCourseDialog.tsx";
import {useState} from "react";
import Button from "@mui/material/Button";
import SearchIcon from '@mui/icons-material/Search';
import useTeachers from "../../hooks/useTeachers.tsx";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function CourseApp() {

    const {courses, deleteCourse, addCourse, loading, updateCourse} = useCourses();
    const {teachers} = useTeachers();

    const [openNewCourseDialog, setOpenNewCourseDialog] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState<string>("");

    function handleOpenNewCourseDialog() {
        setOpenNewCourseDialog(true);
    }

    function handleCloseNewCourseDialog() {
        setOpenNewCourseDialog(false);
    }

    const filteredCourses = courses.filter(course => {
        return course.name.toLowerCase().includes(searchTerm.toLowerCase());
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
                    <Button variant={"outlined"} onClick={handleOpenNewCourseDialog} sx={{mb: 2}}>Neuer Kurs</Button>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Suche nach Kurs..."
                            inputProps={{'aria-label': 'search'}}
                            value={searchTerm}
                            onChange={(event) => setSearchTerm(event.target.value)}
                        />
                    </Search>
                </Box>
                <CourseTable
                    isLoading={loading}
                    teachers={teachers}
                    updateCourse={updateCourse}
                    handleDeleteCourse={deleteCourse}
                    courses={filteredCourses}
                />
            </Container>
            <NewCourseDialog
                open={openNewCourseDialog}
                onClose={handleCloseNewCourseDialog}
                teachers={teachers}
                addCourse={addCourse}
            />
        </Box>
    );
}