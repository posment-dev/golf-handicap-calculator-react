import './App.css';
import NavBar from './NavBar';

import CourseList from './CourseList';
import RoundList from './RoundList';

import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';

function App() {

  const ConnectedRounds = connect((state) => ({
    courses: state.courses,
    rounds: state.rounds,
    loading: state.loading,
  }))(RoundList);

  const ConnectedCourses = connect((state) => ({
    courses: state.courses,
    loading: state.loading,
  }))(CourseList);

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <div className='App-body'>
        <Routes>
          <Route 
            exact path='/'
            element={
              <ConnectedRounds />
            }
          />
          <Route
            path='/courses'
            element={
              <ConnectedCourses />
            }
          />
        </Routes>
        
        
      </div>
    </div>
  );
}

export default App;