import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import PropTypes from 'prop-types';

export default function BasicSelect(props) {

  const { courses } = props;
  const [selectedCourse, setSelectedCourse] = useState(1);

  useEffect(() => {
    console.log(selectedCourse + ' - ' + courses.filter(o => o.id === selectedCourse).map(o => o.name));
  });

  const handleChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name='selCourse'
          value={selectedCourse}
          label="Course"
          onChange={handleChange}
        >
            {courses.map(course =>
                <MenuItem key={course.id} value={course.id}>{course.name}/{course.tees}</MenuItem>
            )}
        </Select>
      </FormControl>
    </Box>
  );
}

BasicSelect.propTypes = {
  courses: PropTypes.array.isRequired
};