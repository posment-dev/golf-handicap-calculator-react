import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

    const { courses } = props;

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
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

CourseList.propTypes = {
    courses: PropTypes.array.isRequired
}

export default CourseList;