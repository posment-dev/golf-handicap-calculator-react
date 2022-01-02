import './App.css';
import AddCourse from './AddCourse';
import AddRound from './AddRound';
import NavBar from './NavBar';
import { addRoundAction, addCourseAction, removeRoundAction, removeCourseAction } from './store';
import { findHighestIdObjectArray } from './Utils';
import CourseList from './CourseList';
import RoundList from './RoundList';

import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';

function App() {

  const dispatch = useDispatch();
  const courses = useSelector(state => state.courses);
  const rounds = useSelector(state => state.rounds);
  const loading = useSelector(state => state.loading);

  const handleAddRound = (event, date) => {
    event.preventDefault();
    const highestId = findHighestIdObjectArray(rounds);
    const round = {
      id: highestId + 1,
      date: event.target.roundDate.value,
      courseId: +event.target.selCourse.value,
      scoreTyp: event.target.scoreTyp.value,
      score: +event.target.score.value,
      pcc: +event.target.pcc.value,
    };
    dispatch(addRoundAction(round));
    axios.post("http://localhost:5050/round/add", round)
    .catch((err) => {
        console.log(err);
        dispatch(removeRoundAction(round.id));
        alert('Add new Round failed. Try again.');
    })
  }

  const handleAddCourse = (event) => {
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
    dispatch(addCourseAction(course));
    axios.post("http://localhost:5050/course/add", course)
    .catch((err) => {
        console.log(err);
        dispatch(removeCourseAction(course.id));
        alert('Add new Round failed. Try again.');
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className='App-body'>
        <Routes>
          <Route path='/courses'
            element={<AddCourse handleSubmit={handleAddCourse} />} />
          <Route exact path='/' element={<AddRound handleSubmit={handleAddRound} courses={courses} loading={loading} />} />
        </Routes>
        <RoundList rounds={rounds} courses={courses} loading={loading} />
        <CourseList courses={courses} loading={loading} />
      </div>
    </div>
  );
}

export default App;