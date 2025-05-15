import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { BooksPage } from "./pages";

function App() {
  return (
    <>
      <BooksPage />
    </>
  );
}

const ObservedApp = App;

const rootElement = document.getElementById("root");
ReactDOM.render(<ObservedApp />, rootElement);
