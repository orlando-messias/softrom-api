// react
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import {
  AppBar,
  Toolbar,
  IconButton,
  MenuItem,
  Menu,
  Button,
  useMediaQuery,
  Box
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import TelegramIcon from '@material-ui/icons/Telegram';
import ViewListIcon from '@material-ui/icons/ViewList';

// image
import logo from '../assets/logo-softrom.png';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'linear-gradient(to bottom, #2E3B55, #44577c )',
    backgroundColor: "#2E3B55",
    boxShadow: 'none',
    height: 90,
    paddingTop: 10,
    marginBottom: 10
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    }
  },
  headerOptions: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer",
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    width: '100%',
    marginLeft: 40
  },
  buttonStyle: {
    color: "white",
    '&:hover': {
      backgroundColor: '#3a4b6b',
      color: '#FFF'
    }
  }
}));

// responsive header with hamburger menu in mobile version
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>

          <Box className={classes.title}>
            <Link to={'/'}>
              <img src={logo} alt="SoftRom Logo" title="SoftRom" />
            </Link>
          </Box>
          <Box>
            {/* displays hamburger menu when mobile */}
            {isMobile ?
              (
                <>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem style={{ marginLeft: 15, marginRight: 15 }} onClick={handleClose}>Home</MenuItem>
                    <MenuItem style={{ marginLeft: 15, marginRight: 15 }} onClick={handleClose}>Contact</MenuItem>
                    <MenuItem style={{ marginLeft: 15, marginRight: 15 }} onClick={handleClose}>About</MenuItem>
                  </Menu>
                </>
              ) :
              (
                <Box style={{ maxWidth: '500px', display: 'flex', marginLeft: 80 }}>
                  <Box className={classes.headerOptions}>
                    <Box className={classes.link}>
                      <Button startIcon={<HomeIcon />} className={classes.buttonStyle}>
                        Home
                      </Button>
                    </Box>
                    <Box className={classes.link}>
                      <Button startIcon={<TelegramIcon />} className={classes.buttonStyle}>
                        Contact
                      </Button>
                    </Box>
                    <Box className={classes.link}>
                      <Button startIcon={<ViewListIcon />} className={classes.buttonStyle}>
                        About
                      </Button>
                    </Box>
                  </Box>

                </Box>
              )}
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;