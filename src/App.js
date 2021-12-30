import './App.css';
import AddCourse from './AddCourse';
import AddRound from './AddRound';
import NavBar from './NavBar';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addRoundAction, addCourseAction, selectCourses, selectRounds } from './store';

function App() {

  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);
  const rounds = useSelector(selectRounds);

  const handleAddRound = (event, date) => {
    event.preventDefault();
    const round = {
      date: date,
      //course: event.target.course.value,
      scoreTyp: event.target.scoreTyp.value,
      score: event.target.score.value,
      pcc: event.target.pcc.value,
    };
    dispatch(addRoundAction(round));
  }

  const handleAddCourse = (event) => {
    event.preventDefault();
    const course = {
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
          <Route exact path='/' element={<AddRound handleSubmit={handleAddRound} />} />
        </Routes>
        <div className='coursesTable'>
          {courses.map(course => <div key={course.name}>{JSON.stringify(course)}</div>)}
        </div>
        <div className='roundsTable'>
          {rounds.map(round => <div key={round.date}>{JSON.stringify(round)}</div>)}
        </div>
      </div>
    </div>
  );
}

export default App;