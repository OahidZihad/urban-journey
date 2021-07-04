import React, { useContext } from "react";
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
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

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
  paperStyle: {
    padding: "20px",
    height: "75vh",
    width: 300,
    margin: "5px auto",
  },
  avatarStyle: {
    backgroundColor: "tomato",
  },
}));

////// MAIN FUNCTION
const Login = () => {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  //Redirect to the desired page after login
  //https://reactrouter.com/web/example/auth-workflow
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

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
        setLoggedInUser(signedInUser);
        console.log("user Name", result);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        // Sign-out successful.
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          photo: "",
          email: "",
          error: "",
          success: false,
        };
        setUser(signedOutUser);
      })
      .catch((err) => {
        // An error happened.
        console.log(err.message);
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
    if (newUser && user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          console.log(userCredential);
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };

          ////// alada kore lekha laglo ei duta line. keno j (...user)
          ////// theke update hocche na, seta bujhtesina....
          newUserInfo.isSignedIn = true;
          newUserInfo.name = userCredential.user.displayName;

          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from); ////Redirect to the desired page after login,,, https://reactrouter.com/web/example/auth-workflow
          console.log("sign in user Name", userCredential.user.displayName);
          console.log("sign in user info", userCredential.user);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }

    event.preventDefault();
  };

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: name,
      })
      .then(() => {
        console.log("successfull");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignUp = () => {
    setNewUser(!newUser);
  };

  return (
    <Grid>
      <Paper elevation={10} className={classes.paperStyle}>
        <Grid align="center">
          <Avatar className={classes.avatarStyle}>
            <LockRoundedIcon />
          </Avatar>
          {newUser ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
        </Grid>
        <form onSubmit={handleSubmit}>
          {newUser && (
            <TextField
              onBlur={handleBlur}
              name="name"
              label="Name"
              placeholder="Your Name"
              required
              fullWidth
              type="text"
            />
          )}
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
            {newUser ? "Sign Up" : "Sign In"}
          </Button>

          {/* <input type="submit" value={newUser ? "Sign Up" : "Sign In"} /> */}

          <Typography>
            <Link style={{ color: "tomato" }} href="#">
              {newUser ? " " : "Fotgot Password?"}
            </Link>
          </Typography>
          <Typography style={{ marginTop: "8px" }}>
            {newUser ? "Already have an account?" : "Don't have an account?"}
            <Link onClick={handleSignUp} style={{ color: "tomato" }} href="#">
              {newUser ? " Sign In" : " Sign Up"}
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
