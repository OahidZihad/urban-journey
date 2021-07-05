import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

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

const Search = (props) => {
  console.log(props);
  const classes = useStyles();
  let history = useHistory();
  const { vehicleId } = useParams();
  const handleSearch = () => {
    console.log("clicked search btn");
    console.log(history);
    history.push(`/vehicle/${vehicleId}`);
  };
  return (
    <div>
      <h1>Search Road Map for {vehicleId}</h1>
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
