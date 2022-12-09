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

import { handleRemoveRound, handleAddRound } from './store';
import { useDispatch } from 'react-redux';

import AddRound from './AddRound';
import { findHighestIdObjectArray } from './Utils';

import PropTypes from 'prop-types';

const RoundList = (props) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));

    const { courses, rounds, loading } = props;
    const dispatch = useDispatch();

    const removeRound = round => {
        dispatch(handleRemoveRound(round));
    }

    const submitAddRound = (event) => {
        event.preventDefault();
        const highestId = findHighestIdObjectArray(rounds);
        const round = {
          id: highestId + 1,
          date: event.target.roundDate.value,
          courseId: parseInt(event.target.selCourse.value),
          scoreTyp: event.target.scoreTyp.value,
          score: parseInt(event.target.score.value),
          adjGrossScore: parseInt(event.target.adjGrossScore.value),
          pcc: parseInt(event.target.pcc.value),
        };
        dispatch(handleAddRound(round));
      }


    if (loading === true) {
        return (<h3>Loading...</h3>)
    }

    return (
        <div>
            <h1>Rounds</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>ID</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Course / Tees</StyledTableCell>
                            <StyledTableCell>Score Typ</StyledTableCell>
                            <StyledTableCell align="right">Score</StyledTableCell>
                            <StyledTableCell align="right">Adj Gross Score</StyledTableCell>
                            <StyledTableCell align="right">PCC</StyledTableCell>
                            <StyledTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rounds.map((round, index) => (
                        <TableRow
                            key={round.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell>{index+1}</StyledTableCell>
                            <StyledTableCell>{round.date}</StyledTableCell>
                            <StyledTableCell>
                                { courses.filter(course => 
                                    course.id === round.courseId
                                ).map(course => 
                                    course.name + '/' + course.tees
                                )[0]
                                }
                            </StyledTableCell>
                            <StyledTableCell>{round.scoreTyp}</StyledTableCell>
                            <StyledTableCell align="right">{round.score}</StyledTableCell>
                            <StyledTableCell align="right">{round.adjGrossScore}</StyledTableCell>
                            <StyledTableCell align="right">{round.pcc}</StyledTableCell>
                            <StyledTableCell align='right'>
                            <IconButton
                                type='submit'
                                color='primary'
                                size='large'
                                onClick={() => { removeRound(round) }}
                            >
                                <Delete />
                            </IconButton>
                            </StyledTableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <AddRound handleSubmit={submitAddRound} courses={courses} loading={loading} />
        </div>
    );
}

RoundList.propTypes = {
    courses: PropTypes.array,
    rounds: PropTypes.array,
    loading: PropTypes.bool
}

export default RoundList;