import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/Navbar/Navbar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import Discover from "./components/Discover"
import { authenticate } from "./store/session";
import Chat from './components/Chat/Chat'
import ServerPage from "./components/ServerPage"
import Delete from './components/Delete';
// import UserBar from './components/UserBar'

function App() {
  const user = useSelector(state => state.session.user)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
    <main>
      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <Route path="/chat" exact={true}>
          <Chat />
        </Route>
        <ProtectedRoute path="/users/:userId" exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} >
          <Discover />
        </ProtectedRoute>
        <ProtectedRoute path="/servers/:id" exact={true}>
          <ServerPage />
        </ProtectedRoute>
        <ProtectedRoute path="/servers/:id/delete" exact={true}>
          <Delete />
        </ProtectedRoute>
        <ProtectedRoute path="/servers/:serverId/channel/:channelId" exact={true}>
          <ServerPage />
        </ProtectedRoute>
      </Switch>
    </main>
    </BrowserRouter>
  );
}

export default App;
