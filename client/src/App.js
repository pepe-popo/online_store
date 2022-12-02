import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "../src/components/AppRouter/AppRouter";
import Header from "./components/Header/Header";
import { authFetching, nonAuthFetching } from "./http/Index";
import { Context } from "./context";
import jwt_decode from 'jwt-decode';

import './AppStyle.css';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});
  const [sections, setSections] = useState([]);
  const [types, setTypes] = useState([]);


  const check = async () => {
    const response = await authFetching('user/auth')
      .then(data => data.json());
    if (response.token) {
      localStorage.setItem('token', response.token);
      setIsAuth(true);
    }
  }

  useEffect(() => {
    nonAuthFetching('section/getAll')
      .then(data => setSections(data));
    nonAuthFetching('type/getAll')
      .then(data => setTypes(data));
    check();
  }, [])


  return (
    <Context.Provider value={{ sections, setSections, types, setTypes }}>
      <BrowserRouter>
        <Header isAuth={isAuth} setIsAuth={setIsAuth} setUser={setUser} />
        <AppRouter isAuth={isAuth} />
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
