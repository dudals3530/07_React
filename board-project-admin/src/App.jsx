import { useContext, useState } from "react";
import "./css/App.css";
import Login from "./components/Login";
import { AuthContext, AuthProvider } from "./components/AuthContext";
import DashBoard from "./components/DashBoard";
import { BrowserRouter } from "react-router-dom";

// 컴포넌트 분리하여 하위 컴포넌트에서 useContext 이용하기
function App() {
  return (
    <AuthProvider>
      <AppComponent />
    </AuthProvider>
  );
}

function AppComponent() {
  // 로그인을 했따면 DashBoard 렌더링
  // 로그인을 안했다면 Login 렌더링
  // -> 조건 : 로그인여부
  // ->         로그인을 했는지 안했는지를 기억해줄 상태값 (user)
  // ->          user 에는 로그인 한 사람에 대한 정보가 세팅.
  // ->         user는 AuthContext안에있다!
  // ->          ContextApi 를 이용하여 렌더링 조건 처리하면 된다!

  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <div className="body-container">
          {/* BrowserRouter : React앱에서 URL 경로에 따라
              컴포넌트를 보여줄 수 있게 해주는 라우팅 컨테이너 (최상위 부모 컴포넌트)
              -> Route,Link,NavLink,useNavigate() 등 같은 라우팅 관련 기능을 사용하려면
              모든 라우팅 요소들을 BrowserRouter 컴포넌트로 감싸야 한다
              */}
          <BrowserRouter>
            <DashBoard />
          </BrowserRouter>
        </div>
      ) : (
        <div className="login-section">
          <Login />
        </div>
      )}
    </>
  );
}

export default App;
