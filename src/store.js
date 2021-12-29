import { createStore, combineReducers , applyMiddleware} from 'redux';

const ADD_COURSE = 'ADD_COURSE'
const REMOVE_COURSE = 'REMOVE_COURSE'
const ADD_ROUND = 'ADD_ROUND'
const REMOVE_ROUND = 'REMOVE_ROUND'

export function addCourseAction (course) {
    return {
    type: ADD_COURSE,
    course,
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
        return state.concat([action.course])
    case REMOVE_COURSE :
        return state.filter((course) => course.id !== action.id)
    default :
        return state
    }
}

function rounds (state = [], action) {
    switch(action.type) {
    case ADD_ROUND :
        return state.concat([action.goal])
    case REMOVE_ROUND :
        return state.filter((goal) => goal.id !== action.id)
    default :
        return state
    }
}

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

const store = createStore(combineReducers({
    courses,
    rounds,
}), applyMiddleware(logger))

export default store;