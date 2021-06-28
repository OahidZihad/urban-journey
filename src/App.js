import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Header from "./Components/Header/Header";
import backgroundimg from "./Components/images/Bg.png";
import Home from "./Components/Home/Home";
import { makeStyles } from "@material-ui/core/styles";
import NoMatch from "./Components/NoMatch/NoMatch";
import Search from "../src/Components/Search/Search";
import Login from "./Components/Login/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100%",
    minWidth: "100%",
    backgroundImage: `url(${backgroundimg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "fixed",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Router>
        <Header></Header>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          {/* <Route path="/friend/:friendId">
          <FriendDetail></FriendDetail>
        </Route> */}
          <Route path="/search">
            <Search></Search>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
