import logo from "./logo.svg";
import "./App.css";
import { cardDatas } from "./data/card";

import styled from "styled-components";

import { useState, useCallback } from "react";

// react-beautiful-dndの対応範囲を括る
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// react-beautiful-dnd の型をImport
import type {
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";

const Scontainer = styled.li`
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
  margin: 30px;
  border: solid 1px #aaa;
  width: 400px;
`;

export const App = () => {
  const [todo, setTodo] = useState(cardDatas);
  const handleDragEnd = useCallback(
    (result: DropResult) => {
      //ドラッグして場所が変わらない場合は返却
      if (!result.destination) {
        return;
      }

      //Todoのデータ（配列データ）を格納
      const newTodo = [...todo];
      //移動する対象のTodoを抜き取り、removedに格納
      const [removed] = newTodo.splice(result.source.index, 1);
      //removedを配列の移動先に格納
      newTodo.splice(result.destination.index, 0, removed);
      //Stateを更新
      setTodo(newTodo);
    },
    [todo]
  );

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="todo">
          {(provided: DroppableProvided) => (
            <TodoCards>
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {cardDatas.map((data, index) => {
                  return (
                    <Draggable
                      draggableId={data.id}
                      key={data.id}
                      index={index}
                    >
                      {(provided: DraggableProvided) => (
                        <Scontainer
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <button>
                            {data.title}:{data.todo}
                          </button>
                          <p>click!</p>
                        </Scontainer>
                      )}
                    </Draggable>
                  );
                })}
              </ul>
            </TodoCards>
          )}
        </Droppable>
        {/* <TodoCards>
          <ul>
            {cardDatas.map((data) => {
              return (
                <Scontainer key={data.id}>
                  <p>{data.title}:</p>
                  <p>{data.todo}</p>
                </Scontainer>
              );
            })}
          </ul>
        </TodoCards> */}
      </DragDropContext>
    </div>
  );
};

export default App;
