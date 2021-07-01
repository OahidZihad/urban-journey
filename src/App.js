import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import NoMatch from "./Components/NoMatch/NoMatch";
import Search from "../src/Components/Search/Search";
import Login from "./Components/Login/Login";

function App() {
  return (
    <div className="body">
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
