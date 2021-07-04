import { makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import logo from "../images/Urban Riders.png";
import { useContext } from "react";
import { UserContext } from "../../App";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

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
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const classes = useStyles();
  let history = useHistory();
  const handleClick = () => {
    history.push("/login");
  };
  const handleHome = () => {
    history.push("/home");
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        // Sign-out successful.
        const signedOutUser = {
          ...loggedInUser,
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
          error: "",
          success: false,
        };
        setLoggedInUser(signedOutUser);
      })
      .catch((err) => {
        // An error happened.
        console.log(err.message);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <Box display="flex" flexWrap="wrap" p={1}>
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
          {loggedInUser.isSignedIn ? (
            <Button className={classes.button}>{loggedInUser.name}</Button>
          ) : (
            <Button
              onClick={handleClick}
              className={classes.button}
              variant="contained"
            >
              Sign In
            </Button>
          )}
        </Box>
        {loggedInUser.isSignedIn ? (
          <Box className={classes.boxButton} p={1}>
            <Button className={classes.button} onClick={handleSignOut}>
              Sign Out
            </Button>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default Header;
