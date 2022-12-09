import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

const ADD_COURSE = 'ADD_COURSE'
const SET_COURSES = 'SET_COURSES'
const REMOVE_COURSE = 'REMOVE_COURSE'
const ADD_ROUND = 'ADD_ROUND'
const SET_ROUNDS = 'SET_ROUNDS'
const REMOVE_ROUND = 'REMOVE_ROUND'

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

export function handleInitialData() {
    return async (dispatch) => {
        return Promise.all([
            axios.get("http://localhost:5050/course/"),
            axios.get("http://localhost:5050/round/"),
        ]).then(([courses, rounds, hcp]) => {
            dispatch(setCoursesAction(courses.data));
            dispatch(setRoundsAction(rounds.data));
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
            let newState = state.concat([action.round]);
            return newState
        case SET_ROUNDS :
            return action.rounds;
        case REMOVE_ROUND :
            return state.filter((round) => round.id !== action.id)
        default :
            return state
    }
}

function loading (state = true, action) {
    switch(action.type) {
        case SET_ROUNDS :
        case SET_COURSES :
            return false;
        default :
            return state;
    }

}

const checker = (store) => (next) => (action) => {
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
    loading,
}), applyMiddleware(thunk, checker, logger))

export default store;