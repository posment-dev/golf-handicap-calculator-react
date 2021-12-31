import {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {

  const options = [
    {
      id: 1,
      name: 'Goldenberg',
    },
    {
      id: 2,
      name: 'Otelfingen'
    },
    {
      id: 3,
      name: 'Augwil'
    },
    {
      id: 4,
      name: 'Küssnacht'
    }
  ];

  const [selectedCourse, setSelectedCourse] = useState(1);

  useEffect(() => {
    console.log(selectedCourse + ' - ' + options.filter(o => o.id === selectedCourse).map(o => o.name));
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
            {options.map(option =>
                <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
            )}
        </Select>
      </FormControl>
    </Box>
  );
}
