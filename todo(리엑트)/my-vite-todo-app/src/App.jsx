import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./pages/TodoDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* 공통헤더 - 모든 페이지에서 보임 */}
        <header className="header">
          <h1>
            <Link to="/">Todo</Link> {/*클릭시 홈으로이동 */}
          </h1>
          <nav>
            <Link to="/">Home</Link>{/*클릭시 홈으로이동 */}
          </nav>
        </header>

        {/* 메인 컨텐츠 영역 - URL에 따라 다른 컴포넌트 렌더링*/}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            {/* / → Home 컴포넌트 */}
            <Route path="/todo/:todoNo" element={<TodoDetail />}></Route>
             {/* /todo/17 → TodoDetail 컴포넌트 (17은 todoNo) */}
            <Route path="*" element={<Home />}></Route>
              {/* 잘못된 URL → Home으로 리다이렉트 */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
