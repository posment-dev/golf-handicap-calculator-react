import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import { calulateScoreDifferential } from './Utils';

const ADD_COURSE = 'ADD_COURSE'
const SET_COURSES = 'SET_COURSES'
const REMOVE_COURSE = 'REMOVE_COURSE'
const ADD_ROUND = 'ADD_ROUND'
const SET_ROUNDS = 'SET_ROUNDS'
const REMOVE_ROUND = 'REMOVE_ROUND'
const SET_HCP = 'SET_HCP'

export function addCourseAction (course) {
    return {
    type: ADD_COURSE,
    course,
    }
}

export function handleAddCourse(course, cb = () => {}) {
    return (dispatch) => {
        dispatch(addCourseAction(course));
        return axios.post("http://localhost:5050/course/add", course)
        .then(() => cb() )
        .catch((err) => {
            console.log(err);
            dispatch(removeCourseAction(course.id));
            alert('Add new Course failed. Try again.');
        })
    }
}

export function setCoursesAction (courses) {
    return {
    type: SET_COURSES,
    courses,
    }
}

export function removeCourseAction (id) {
    return {
    type: REMOVE_COURSE,
    id,
    }
}

export function handleRemoveCourse(course, cb = () => {}) {
    return async (dispatch) => {
        dispatch(removeCourseAction(course.id));
        return axios.delete('http://localhost:5050/course/' + course.id)
        .then(() => cb() )
        .catch((err) => {
            console.log(err);
            dispatch(addCourseAction(course));
            alert('Deleting Course failed. Try again.');
        })
    }
}

export function addRoundAction (round) {
    return {
    type: ADD_ROUND,
    round,
    }
}

export function handleAddRound(round, cb = () => {}) {
    return async (dispatch) => {
        dispatch(addRoundAction(round));
        return axios.post("http://localhost:5050/round/add", round)
        .then(() => cb() )
        .catch((err) => {
            console.log(err);
            dispatch(removeRoundAction(round.id));
            alert('Add new Round failed. Try again.');
        })
    }
}

export function setRoundsAction (rounds) {
    return {
    type: SET_ROUNDS,
    rounds,
    }
}

export function removeRoundAction (id) {
    return {
    type: REMOVE_ROUND,
    id,
    }
}

export function handleRemoveRound(round, cb = () => {}) {
    return async (dispatch) => {
        dispatch(removeRoundAction(round.id));
        return axios.delete('http://localhost:5050/round/' + round.id)
        .then(() => cb() )
        .catch((err) => {
            console.log(err);
            dispatch(addRoundAction(round));
            alert('Deleting Round failed. Try again.');
        })
    }
}

export function setHcpAction (rounds, courses) {
    // Calculate HCP Data
    const sds = rounds.map( function(round) {
        let course = courses.find(course => course.id === round.courseId);
        console.log(course);
        return calulateScoreDifferential(round.scoreTyp, round.score, round.pcc, course.courseRating, course.slope);
        }
    );
    let currentHcp = sds.reduce( function(a,b) {
        return a + (b/rounds.length)
    }, 0);
    currentHcp = currentHcp.toFixed(2);
    const lowestSD = Math.min.apply(null, sds).toFixed(2);
    const highestSD = Math.max.apply(null, sds).toFixed(2);
    const hcp = {
        currentHcp: currentHcp,
        lowestSD: lowestSD,
        highestSD: highestSD,
    };
    return {
        type: SET_HCP,
        hcp,
    }
}

export function handleInitialData() {
    return async (dispatch) => {
        return Promise.all([
            axios.get("http://localhost:5050/course/"),
            axios.get("http://localhost:5050/round/"),
        ]).then(([courses, rounds, hcp]) => {
            dispatch(setCoursesAction(courses.data));
            dispatch(setRoundsAction(rounds.data));
            dispatch(setHcpAction(rounds.data, courses.data));
        })
    }
}


//recuders
function courses (state = [], action) {
    switch(action.type) {
    case ADD_COURSE :
        return state.concat([action.course]);
    case SET_COURSES :
        return action.courses;
    case REMOVE_COURSE :
        return state.filter((course) => course.id !== action.id);
    default :
        return state;
    }
}

function rounds (state = [], action) {
    switch(action.type) {
        case ADD_ROUND :
            return state.concat([action.round])
        case SET_ROUNDS :
            return action.rounds;
        case REMOVE_ROUND :
            return state.filter((round) => round.id !== action.id)
        default :
            return state
    }
}

function hcp (state = [], action) {
    switch(action.type) {
        case SET_HCP :
            return action.hcp;
        default :
            return state
    }
}

function loading (state = true, action) {
    switch(action.type) {
        case SET_ROUNDS :
        case SET_COURSES :
        case SET_HCP:
            return false;
        default :
            return state;
    }

}

const checker = (store) => (next) => (action) => {
    if (
        action.type === REMOVE_COURSE &&
        store.getState().rounds.map(round => round.courseId)
        .includes(action.id)
    ) {
        return alert("That's a bad idea.\nYou are not allowed to delete a course, which is used by at least one round.")
    }

    return next(action)
}

const logger = (store) => (next) => (action) => {
    console.group(action.type);
    console.log('The action: ', action);
    const result = next(action);
    console.log('The new state: ', store.getState());
    console.groupEnd();
    return result;
}

const store = createStore(combineReducers({
    courses,
    rounds,
    hcp,
    loading,
}), applyMiddleware(thunk, checker, logger))

export default store;