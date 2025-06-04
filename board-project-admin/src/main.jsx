import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"; //컴포넌트 이용할떄는 이런식으로 이름 from 위치

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  //  </StrictMode>,   //개발할때만 콘솔창에서 두번씩 띄울떄가잇음
);
