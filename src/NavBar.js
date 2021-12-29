import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const NavBar = (props) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='relative'>
            <Toolbar>
              {/*<IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>*/}
              <Button href='/' color='inherit'>Rounds</Button>
              <Button href='/courses' color='inherit'>Courses</Button>
            </Toolbar>
          </AppBar>
        </Box>
      );
}

export default NavBar;