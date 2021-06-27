import logo from "./logo.svg";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white",
    backgroundColor: "tomato",
  },
  buttonSize: {
    borderRadius: "50px",
    height: "75px",
    width: "75px",
    color: "white",
    backgroundColor: "tomato",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <header className="App-header">
        <Button variant="contained">Default</Button>
        <br />
        <Button className={classes.button} variant="contained">
          Primary
        </Button>
        <br />
        <Button variant="outlined" color="secondary">
          Secondary
        </Button>
        <br />
        <Button className={classes.buttonSize} variant="contained">
          Disabled
        </Button>
        <br />
        <Button variant="text" color="primary" href="#contained-buttons">
          Link
        </Button>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
