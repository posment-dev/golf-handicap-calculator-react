import { createStore, combineReducers , applyMiddleware} from 'redux';
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

export function addRoundAction (round) {
    return {
    type: ADD_ROUND,
    round,
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

function courses (state = [], action) {
    switch(action.type) {
    case ADD_COURSE :
        axios.post("http://localhost:5050/course/add", action.course);
        return state.concat([action.course]);
    case SET_COURSES :
        return action.courses;
    case REMOVE_COURSE :
        axios.delete('http://localhost:5050/course/' + action.id);
        return state.filter((course) => course.id !== action.id);
    default :
        return state;
    }
}

function rounds (state = [], action) {
    switch(action.type) {
        case ADD_ROUND :
            axios
            .post("http://localhost:5050/round/add", action.round)
            .then((res) => console.log(res.data));
            return state.concat([action.round])
        case SET_ROUNDS :
            return action.rounds;
        case REMOVE_ROUND :
            axios.delete('http://localhost:5050/round/' + action.id).then((response) => {console.log(response.data)});
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
    console.group(action.type)
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
    console.groupEnd()
    return result
}

const store = createStore(combineReducers({
    courses,
    rounds,
    loading,
}), applyMiddleware(thunk, checker, logger))

export default store;