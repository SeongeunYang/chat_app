import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Main from "./routes/Main"
import Chat from "./routes/Chat"
import Login from "./routes/Login"
import FreePost from "./routes/FreePost"
import MyChatList from "./routes/MyChatList"

function App() {
  return <Router>
    <Switch>
      <Route path="/chat/room/:userId">
        <Chat />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/mychats">
        <MyChatList />
      </Route>
      <Route path="/write/freepost">
        <FreePost />
      </Route>
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  </Router>;
}

export default App;
