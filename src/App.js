import './App.css';
import AddCourse from './AddCourse';
import AddRound from './AddRound';
import NavBar from './NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {

  const handleSubmit = () => {
    console.log('Click happened');
    alert('Hello');
  }

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <Routes>
        <Route path='/courses'
          element={<AddCourse handleSubmit={handleSubmit} />} />
        <Route exact path='/' element={<AddRound handleSubmit={handleSubmit} />} />
      </Routes>
    </div>
  );
}

export default App;