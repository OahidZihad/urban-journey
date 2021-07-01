import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 270,
  },
  media: {
    height: 0,
    paddingTop: "83%",
  },

  img: {
    height: 109,
    width: 129,
    margin: "50px",
  },
  alignCenter: {
    marginBottom: "5px",
  },
}));

const Vehicles = (props) => {
  const classes = useStyles();
  const history = useHistory();

  const handleClick = () => {
    console.log("clicked vehicle");
    history.push("/search");
  };

  const { title, imgUrl, capacity, price } = props.vehicle;
  return (
    <Button onClick={handleClick}>
      <Card className={classes.root}>
        <CardMedia className={classes.img} image={imgUrl} />
        <Typography
          className={classes.alignCenter}
          variant="h5"
          component="h2"
          align="center"
        >
          {title}
        </Typography>
      </Card>
    </Button>
  );
};

export default Vehicles;
