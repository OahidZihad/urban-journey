import React from "react";
import Vehicles from "../Vehicles/Vehicles";
import Bike from "../images/Frame.png";
import Car from "../images/Frame-2.png";
import Bus from "../images/Frame-1.png";
import Train from "../images/Group.png";
import backgroundimg from "../images/Bg.png";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    margin: "80px",
    paddingLeft: "70px",
    paddingRight: "70px",
  },
}));

const Home = () => {
  const classes = useStyles();
  const vehicles = [
    {
      title: "BIKE",
      imgUrl: Bike,
      capacity: 1,
      price: 50,
    },
    {
      title: "CAR",
      imgUrl: Car,
      capacity: 4,
      price: 100,
    },
    {
      title: "BUS",
      imgUrl: Bus,
      capacity: 40,
      price: 200,
    },
    {
      title: "TRAIN",
      imgUrl: Train,
      capacity: 100,
      price: 300,
    },
  ];
  return (
    <div className={classes.root}>
      {vehicles.map((vehicle) => (
        <Vehicles vehicle={vehicle}></Vehicles>
      ))}
    </div>
  );
};

export default Home;
