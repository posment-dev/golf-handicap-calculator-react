import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

const options = [
  {
    courseId: 1,
    name: 'Goldenberg',
  },
  {
    courseId: 2,
    name: 'Otelfingen'
  },
  {
    courseId: 3,
    name: 'Augwil'
  },
  {
    courseId: 4,
    name: 'Küssnacht'
  }
];

console.log(options);

export default function SimpleListMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCourse, setSelectedCourse] = React.useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, courseId) => {
    setSelectedCourse(courseId);
    console.log(options.filter(course => course.courseId === selectedCourse));
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label='Courses'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <ListItemText
            primary={options.filter(course => course.courseId === selectedCourse).map(course => course.name)}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option.courseId === selectedCourse}
            onClick={(event) => handleMenuItemClick(event, option.courseId)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
