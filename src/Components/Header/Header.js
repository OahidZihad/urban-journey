import { makeStyles } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import logo from "../images/Urban Riders.png";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    backgroundColor: "tomato",
    borderRadius: "5px",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  logo: {
    padding: "10px",
    height: "70%",
    width: "300px",
    opacity: 0.8,
  },
  box: {
    padding: "30px",
  },
  boxButton: {
    padding: "28px",
  },
}));

const Header = () => {
  const classes = useStyles();
  let history = useHistory();
  const handleClick = () => {
    history.push("/login");
  };
  const handleHome = () => {
    history.push("/home");
  };
  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <Button onClick={handleHome}>
            <img className={classes.logo} src={logo} alt="" />
          </Button>
        </Box>
        <Box className={classes.box} p={1}>
          <Button onClick={handleHome} variant="text">
            Home
          </Button>
        </Box>
        <Box className={classes.box} p={1}>
          <Button variant="text">Destination</Button>
        </Box>
        <Box className={classes.box} p={1}>
          <Button variant="text">Blog</Button>
        </Box>
        <Box className={classes.box} p={1}>
          <Button variant="text">Contact</Button>
        </Box>
        <Box className={classes.boxButton} p={1}>
          <Button
            onClick={handleClick}
            className={classes.button}
            variant="contained"
          >
            Login
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Header;
