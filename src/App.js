import './App.css';
import AddCourse from './AddCourse';
import AddRound from './AddRound';
import NavBar from './NavBar';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseAction, selectCourses } from './store';

function App() {

  const dispatch = useDispatch();
  const courses = useSelector(selectCourses);

  const handleSubmit = () => {
    console.log('Click happened');
    alert('Hello');
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
      <Routes>
        <Route path='/courses'
          element={<AddCourse handleSubmit={handleAddCourse} />} />
        <Route exact path='/' element={<AddRound handleSubmit={handleSubmit} />} />
      </Routes>
      <div>
        {courses.map(course => <div key={course.name}>{JSON.stringify(course)}</div>)}
      </div>
    </div>
  );
}

export default App;