import { createStore, combineReducers , applyMiddleware} from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';

const ADD_COURSE = 'ADD_COURSE'
const SET_COURSES = 'SET_COURSES'
const REMOVE_COURSE = 'REMOVE_COURSE'
const ADD_ROUND = 'ADD_ROUND'
const REMOVE_ROUND = 'REMOVE_ROUND'

//let initailCourses = [];

/*axios.get("http://localhost:5050/course/")
    .then((response) => initailCourses = response.data)
    .catch(function (error) {
        console.log(error);
    });*/

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

export function removeRoundAction (id) {
    return {
    type: REMOVE_ROUND,
    id,
    }
}

function courses (state = [], action) {
    switch(action.type) {
    case ADD_COURSE :
        axios
        .post("http://localhost:5050/course/add", action.course)
        .then((res) => console.log(res.data));
        return state.concat([action.course])
    case SET_COURSES :
        return action.courses;
    case REMOVE_COURSE :
        return state.filter((course) => course.id !== action.id)
    default :
        return state
    }
}

function rounds (state = [], action) {
    switch(action.type) {
    case ADD_ROUND :
        axios
        .post("http://localhost:5050/round/add", action.round)
        .then((res) => console.log(res.data));
        return state.concat([action.round])
    case REMOVE_ROUND :
        return state.filter((goal) => goal.id !== action.id)
    default :
        return state
    }
}

export const fetchCourses = () => {
    return async dispatch => {
        try {
            let courses = await axios.get("http://localhost:5050/course/");
            dispatch(setCoursesAction(courses.data));
        }
        catch(e){
            console.log(e)
        }
    }
}

/*export const fetchRounds = () => {
    return async dispatch => {
        try {
            let courses = await axios.get("http://localhost:5050/course/");
            dispatch(setCoursesAction(courses.data));
        }
        catch(e){
            console.log(e)
        }
    }
}*/

/*const checker = (store) => (next) => (action) => {
    if (
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().includes('bitcoin')
    ) {
    return alert("Nope. That's a bad idea.")
    }

    if (
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().includes('bitcoin')
    ) {
    return alert("Nope. That's a bad idea.")
    }

    return next(action)
}*/

const logger = (store) => (next) => (action) => {
    console.group(action.type)
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
    console.groupEnd()
    return result
}

export const selectCourses = (state) => store.getState().courses;
export const selectRounds = (state) => store.getState().rounds;

const store = createStore(combineReducers({
    courses,
    rounds,
}), applyMiddleware(thunk, logger))

export default store;