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
import KakaoAuthHandle2 from "./components/KakaoAuthHandle2"
import NaverAuthHandle from "./components/NaverAuthHandle"

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
      <Route 
        exact 
        path="/user/naver/callback"
        component={NaverAuthHandle}
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
      <Route 
        exact 
        path="/user/kakao/callback/properties"
        component={KakaoAuthHandle2}
      />
      <Route path="/">
        <Main />
      </Route>
    </Switch>
  </Router>;
}

export default App;
