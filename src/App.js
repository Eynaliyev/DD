import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const { title } = "DataDog task";
  return (
    <div className="app">
      <header className="app__header">
        <Link to="/">{title}</Link>
      </header>
    </div>
  );
}

export default App;
