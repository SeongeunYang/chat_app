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
import Snow from "./components/Snow"
import Region from "./components/Region"
import KakaoAuthHandle from "./components/KakaoAuthHandle"

function App() {
  return <Router>
    <Switch>
      <Route path="/chat/myroom">
        <Chat />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route 
        exact 
        path="/user/kakao/callback"
        component={KakaoAuthHandle}
      />
      <Route path="/mychats">
        <MyChatList />
      </Route>
      <Route path="/write/freepost">
        <FreePost />
      </Route>
      <Route path="/snow">
        <Snow />
      </Route>
      <Route path="/region">
        <Region />
      </Route>
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  </Router>;
}

export default App;
