import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';

import { handleRemoveCourse, handleAddCourse } from './store';
import { useDispatch } from 'react-redux';

import AddCourse from './AddCourse';
import { findHighestIdObjectArray } from './Utils';

import PropTypes from 'prop-types';

const CourseList = (props) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

    const { courses, loading } = props;
    const dispatch = useDispatch();

    const submitAddCourse = (event) => {
        event.preventDefault();
        const highestId = findHighestIdObjectArray(courses);
        const course = {
          id: highestId + 1,
          name: event.target.courseName.value,
          tees: event.target.tees.value,
          par: +event.target.par.value,
          courseRating: +event.target.courseRating.value,
          slope: +event.target.slope.value,
        };
        dispatch(handleAddCourse(course));
      }

    const removeCourse = course => {
        dispatch(handleRemoveCourse(course));
    }

    if (loading === true) {
        return (<h3>Loading...</h3>)
    }

    return (
        <div>
            <h1>Courses</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Course Name</StyledTableCell>
                            <StyledTableCell>Tees</StyledTableCell>
                            <StyledTableCell align="right">Par</StyledTableCell>
                            <StyledTableCell align="right">Course Rating</StyledTableCell>
                            <StyledTableCell align="right">Slope Rating</StyledTableCell>
                            <StyledTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {courses.map((course) => (
                        <TableRow
                            key={course.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                {course.name}
                            </StyledTableCell>
                            <StyledTableCell>{course.tees}</StyledTableCell>
                            <StyledTableCell align="right">{course.par}</StyledTableCell>
                            <StyledTableCell align="right">{course.courseRating}</StyledTableCell>
                            <StyledTableCell align="right">{course.slope}</StyledTableCell>
                            <StyledTableCell align='right'>
                            <IconButton
                                type='submit'
                                color='primary'
                                size='large'
                                onClick={() => { removeCourse(course) }}
                            >
                                <Delete />
                            </IconButton>
                            </StyledTableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddCourse handleSubmit={submitAddCourse} />
        </div>
    );
}

CourseList.propTypes = {
    courses: PropTypes.array,
    loading: PropTypes.bool
}

export default CourseList;