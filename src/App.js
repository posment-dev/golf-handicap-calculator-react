import './App.css';
import AddCourse from './AddCourse';
import AddRound from './AddRound';
import NavBar from './NavBar';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRoundAction, addCourseAction, selectCourses, selectRounds, removeCourseAction, removeRoundAction } from './store';
import { findHighestIdObjectArray } from './Utils';

function App() {

  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const rounds = useSelector(selectRounds);

  const handleAddRound = (event, date) => {
    event.preventDefault();
    const highestId = findHighestIdObjectArray(rounds);
    const round = {
      id: highestId + 1,
      date: date,
      courseId: event.target.selCourse.value,
      scoreTyp: event.target.scoreTyp.value,
      score: event.target.score.value,
      pcc: event.target.pcc.value,
    };
    dispatch(addRoundAction(round));
  }

  const handleAddCourse = (event) => {
    event.preventDefault();
    const highestId = findHighestIdObjectArray(courses);
    const course = {
      id: highestId + 1,
      name: event.target.courseName.value,
      tees: event.target.tees.value,
      par: event.target.par.value,
      cr: event.target.courseRating.value,
      slope: event.target.slope.value,
    };
    dispatch(addCourseAction(course));
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
          <Route exact path='/' element={<AddRound handleSubmit={handleAddRound} courses={courses} />} />
        </Routes>
        <div className='coursesTable'>
          {courses.map(course => (
            <div key={course.id}>
              {JSON.stringify(course)}
              <button onClick={() => dispatch(removeCourseAction(course.id))}>XXX</button>
            </div>
          ))}
        </div>
        <div className='roundsTable'>
          {rounds.map(round => (
            <div key={round.id}>
              {JSON.stringify(round)}
              <button onClick={() => dispatch(removeRoundAction(round.id))}>XXX</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;