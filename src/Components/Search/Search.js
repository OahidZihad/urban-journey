import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

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
}));

const Search = () => {
  const classes = useStyles();
  let history = useHistory();
  const handleSearch = () => {
    console.log("clicked search btn");
    console.log(history);
    history.push("/login");
  };
  return (
    <div>
      <h1>this is search</h1>
      <Button
        onClick={handleSearch}
        className={classes.button}
        variant="contained"
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
