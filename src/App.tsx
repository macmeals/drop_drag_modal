import logo from "./logo.svg";
import "./App.css";
import { cardData } from "./data/card";

// import React from "react";
import styled from "styled-components";

const Scontainer = styled.div`
  border: solid 1px #aaa;
  border-radius: 20px;
  padding: 8px;
  margin: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 300px;
`;

const TodoCards = styled.div`
  margin-top: 30px;
  border: solid 1px #aaa;
  width: 400px;
`;

export const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <TodoCards>
        <ul>
          {cardData.map((data) => {
            return (
              <Scontainer key={data.id}>
                <p>{data.title}:</p>
                <p>{data.todo}</p>
              </Scontainer>
            );
          })}
        </ul>
      </TodoCards>
    </div>
  );
};

export default App;
