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
  Stepper,
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

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

  const {
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  console.log(watch("example"));
  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockRoundedIcon />
          </Avatar>
          <h2>Login</h2>
        </Grid>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            placeholder="Your Email"
            required
            fullWidth
          />
          <TextField
            label="Password"
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
            Login
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
              Create Account
            </Link>
          </Typography>
        </form>
        <Typography align="center" style={{ margin: "10px 0" }}>
          Or
        </Typography>
        <Button className={classes.twitterButton} variant="outlined" fullWidth>
          <Avatar
            style={{
              display: "flex",
              justifyContent: "left",
              alignContent: "left",
              color: "tomato",
              backgroundColor: "transparent",
            }}
          >
            <TwitterIcon></TwitterIcon>
          </Avatar>
          Continue With Twitter
        </Button>
      </Paper>
    </Grid>
  );
};

export default Login;
