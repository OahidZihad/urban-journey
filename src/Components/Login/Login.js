import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import {
  Grid,
  Paper,
  Avatar,
  Button,
  TextField,
  Link,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import GoogleIcon from "@material-ui/icons/GTranslate";
import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const useStyles = makeStyles((theme) => ({
  hr: {
    color: "tomato",
    width: "50px",
  },
  button: {
    color: "white",
    backgroundColor: "tomato",
    borderRadius: "5px",
    margin: "8px 0",
  },
  twitterButton: {
    borderRadius: "50px",
    height: "40px",
    textTransform: "none",
  },
}));

////// MAIN FUNCTION
const Login = () => {
  const classes = useStyles();
  const paperStyle = {
    padding: "20px",
    height: "70vh",
    width: 300,
    margin: "5px auto",
  };
  const avatarStyle = {
    backgroundColor: "tomato",
  };

  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
  });

  var googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
        };
        setUser(signedInUser);
        console.log("user Name", displayName);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleBlur = (event) => {
    let isFormValid = true;
    if (event.target.name === "email") {
      isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordHasNumber;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const handleSubmit = (event) => {
    console.log(user.email, user.password);
    if (user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          setUser(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }

    if (user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          setUser(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    }

    event.preventDefault();
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockRoundedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            onBlur={handleBlur}
            name="email"
            label="Email"
            placeholder="Your Email"
            required
            fullWidth
            type="text"
          />
          <TextField
            onBlur={handleBlur}
            label="Password"
            name="password"
            placeholder="Your Password"
            required
            fullWidth
            type="password"
          />
          <FormControlLabel
            control={<Checkbox style={{ color: "tomato" }} name="checkedB" />}
            label="Remember Me"
          />
          <Button className={classes.button} type="submit" fullWidth>
            Sign In
          </Button>
          <Typography>
            <Link style={{ color: "tomato" }} href="#">
              Fotgot Password?
            </Link>
          </Typography>
          <Typography style={{ marginTop: "8px" }}>
            Don't have an account?
            <Link style={{ color: "tomato" }} href="#">
              {" "}
              Sign Up
            </Link>
          </Typography>
        </form>
        <Typography align="center" style={{ margin: "10px 0" }}>
          Or
        </Typography>
        <Button
          onClick={handleGoogleLogin}
          className={classes.twitterButton}
          variant="outlined"
          fullWidth
        >
          <Avatar
            style={{
              display: "flex",
              justifyContent: "left",
              alignContent: "left",
              color: "tomato",
              backgroundColor: "transparent",
            }}
          >
            <GoogleIcon></GoogleIcon>
          </Avatar>
          Continue With Google
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
