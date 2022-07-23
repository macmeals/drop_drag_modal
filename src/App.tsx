import logo from "./logo.svg";
import "./App.css";
// import { cardDatas } from "./data/card";

// import styled from "styled-components";
// import { useState, useCallback } from "react";

//認証のログインの際、ページを遍移する
import { Router } from "./router/Router";
import { BrowserRouter } from "react-router-dom";

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <BrowserRouter>
        <Router /> {/* //Router.jsxを呼び出す。 */}
      </BrowserRouter>
    </div>
  );
};

export default App;
