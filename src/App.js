import './App.css';
import NavBar from './NavBar';

import CourseList from './CourseList';
import RoundList from './RoundList';

import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

function App() {

  const courses = useSelector(state => state.courses);
  const rounds = useSelector(state => state.rounds);
  const loading = useSelector(state => state.loading);

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
              <RoundList 
                rounds={rounds}
                courses={courses}
                loading={loading}
              />
            }
          />
          <Route
            path='/courses'
            element={
              <CourseList
                courses={courses}
                loading={loading}
              />
            }
          />
        </Routes>
        
        
      </div>
    </div>
  );
}

export default App;