import { calulateScoreDifferential } from './Utils';

import PropTypes from 'prop-types';

const Dashboard = (props) => {

    const { rounds, courses, loading } = props;

    
    // Calculate HCP Data
    let newest20 = rounds;
    if (newest20.length > 20) {
        newest20.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        newest20 = newest20.slice(0,20);
    }
    const sds = rounds.map( function(round) {
        let course = courses.find(course => course.id === round.courseId);
        const sd = calulateScoreDifferential(round.scoreTyp, round.adjGrossScore, round.pcc, course.courseRating, course.slope);
        return {roundId: round.id, sd: sd};
        }
    );
    // Define what rounds count to HCP
    let currentHcp = sds.slice(0,8).reduce( function(a,b) {
        return a + (b.sd/8)
    }, 0);
    currentHcp = currentHcp.toFixed(1);
    const lowestSD = Math.min.apply(null, sds.map(s => s.sd)).toFixed(1);
    const highestSD = Math.max.apply(null, sds.map(s => s.sd)).toFixed(1);
    const hcp = {
        currentHcp: currentHcp,
        lowestSD: lowestSD,
        highestSD: highestSD,
    };


    if (loading === true) {
        return (<h3>Loading...</h3>)
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h1>HCP: {hcp.currentHcp}</h1>
            <h2>Lowest Score Differential: {hcp.lowestSD} | Highest Score Differential: {hcp.highestSD}</h2>
        </div>
    );
}

Dashboard.propTypes = {
    courses: PropTypes.array,
    rounds: PropTypes.array,
    loading: PropTypes.bool
}

export default Dashboard;