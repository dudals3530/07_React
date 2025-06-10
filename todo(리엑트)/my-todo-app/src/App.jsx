import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* 헤더 */}
        <header className="header">
          <h1>
            <Link to="/">Todo</Link>
          </h1>
          <nav>
            <Link to="/">Home</Link>
          </nav>
        </header>

        {/* 메인 */}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/todo/:todoNo" element={<TodoDetail />}></Route>
            <Route path="*" element={<Home />}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
