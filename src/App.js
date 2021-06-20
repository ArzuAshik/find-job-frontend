import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import { ToastProvider } from 'react-toast-notifications';
import Navbar from "./components/Navbar";
import Admin from "./pages/Admin/Admin";
import HomePage from "./pages/HomePage/HomePage";
import LoginSignUp from "./pages/LoginSignUp/LoginSignUp";
import NotFound from "./pages/NotFound/NotFound";
import Payment from "./pages/Payment/Payment";
import Profile from "./pages/Profile/Profile";
import "./style.css";

export const UserContext = createContext();

function App() {
  const [userInfo, setUserInfo] = useState({});
  return (
    <Router>
      <UserContext.Provider value={[userInfo, setUserInfo]} >
        <ToastProvider>
          <Navbar />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/auth" component={LoginSignUp} />
            <Route path="/payment" component={Payment} />
            <Route path="/profile" component={Profile} />
            <Route path="/admin" component={Admin} />
            <Route path="*" component={NotFound} />
          </Switch>
        </ToastProvider>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
