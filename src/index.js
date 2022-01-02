import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store, { setCoursesAction, setRoundsAction } from './store';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { StyledEngineProvider } from '@mui/material/styles';
import axios from 'axios';

// Fetch Data from DB, before component renders
Promise.all([
  axios.get("http://localhost:5050/course/"),
  axios.get("http://localhost:5050/round/"),
]).then(([courses, rounds]) => {
  console.log(rounds);
  console.log(courses);
  store.dispatch(setCoursesAction(courses.data));
  store.dispatch(setRoundsAction(rounds.data));
})

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
