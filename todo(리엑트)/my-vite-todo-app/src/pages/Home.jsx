//메인 홈페이지 만들어보자잇
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { todoApi } from "../services/todoApi";

const Home = () => {
  // 상태관리
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  // 새 할일 추가용 상태
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  useEffect(() => {
    loadTodos();
  }, []); // 빈배열로 하고 페이지 로드될때 할일 목록 가져오기

  // 할일 목록 불러오기
  const loadTodos = async () => {
    try {
      console.log("할일목록 불러오는중 ..");
      setLoading(true);
      const todoList = await todoApi.getTodoList();
      console.log(todoList, "할일");
      setTodos(todoList);
    } catch (err) {
      console.log("할일목록 조회중 에러발생!", err);
      alert("할일 목록 불러오기 실패!");
    } finally {
      setLoading(false);
    }
  };

  //할일 추가
  const handleAddTodo = async (e) => {
    e.preventDefault();

    if (newTitle.trim().length === 0) {
      alert("할일 제목을 입력해주세요");
      return;
    }

    if (newContent.trim().length === 0) {
      alert("할일 상세를 입력해주세요");
      return;
    }

    try {
      console.log("할일추가", { newTitle, newContent });
      const result = await todoApi.addTodo({
        todoTitle: newTitle.trim(),
        todoContent: newContent.trim(),
      });

      if (result > 0) {
        console.log("할일 추가 성공!!!");
        setNewTitle(""); //할일 추가성공하면 다시빈칸으로
        setNewContent("");
        await loadTodos(); // 목록 새로고침 .. 오 이렇게도 할수있군..
        alert("할일을 추가하였습니다.");
      } else {
        alert("할일 추가 실패!!!...");
      }
    } catch (error) {
      console.log("할일 추가중 에러!!", error);
      alert("할일추가중 에러가 발생했습니다.");
    }
  };

  // 완료 상태 변경 (토글식으로)
  const handleToggleComplete = async (todo) => {
    try {
      console.log("완료상태변경시작");
      console.log("현재Todo", todo);
      console.log("현재완료상태", todo.complete);

      const result = await todoApi.toggleComplete(todo);
      if (result > 0) {
        console.log("완료상태변경 완료");
        await loadTodos();
      }
    } catch (error) {
      console.log("완료상태변경중 에러발생", error);
      alert("완료상태변경중 에러발생!!");
    }
  };

  // 투두 삭제 하기
  const handleDeleteTodo = async (todo) => {
    if (!window.confirm(`${todo.todoTitle}을 정말 삭제하시겠습니까?`)) {
      return;
    }

    try {
      const result = await todoApi.deleteTodo(todo);

      if (result > 0) {
        console.log("할일 삭제 성공!!");
        alert("할일을 삭제하였습니다.");
        await loadTodos();
      }
    } catch (error) {
      console.log("투두 삭제중 에러발생", error);
      alert("투두 삭제를 실패하였습니다.");
    }
  };

  // 통계 계산 (complete 필드를 사용 ???)
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.complete === "Y").length;
  // filter 부분 잘 모르니깐 한번더 검색해보자 .. ㅇㅇ
  const activeCount = totalCount - completedCount;

  if (loading) {
    return (
      <div className="loading">
        <h2>할일 로딩중 ..</h2>
      </div>
    );
  }
  return (
    <div className="home">
      <div className="container">
        {/* 헤더 및 통계 */}
        <div className="header-section">
          <h2>나의 할일 관리</h2>
          <div className="stats">
            <span className="stat-item total">📋 전체: {totalCount}개</span>
            <span className="stat-item active">⏳ 진행중: {activeCount}개</span>
            <span className="stat-item completed">
              ✅ 완료: {completedCount}개
            </span>
          </div>
        </div>

        {/* 새 할일 추가 폼 */}
        <div className="add-section">
          <h3>➕ 새 할일 추가</h3>
          <form onSubmit={handleAddTodo} className="add-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="할일 제목을 입력하세요"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="input-title"
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="할일 내용을 입력하세요 (선택사항)"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows="3"
                className="input-content"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn-add">
                할일 추가하기
              </button>
            </div>
          </form>
        </div>

        {/* 할일 목록 */}
        <div className="list-section">
          <h3>📋 할일 목록 ({totalCount}개)</h3>

          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h4>아직 등록된 할일이 없습니다</h4>
              <p>위에서 새로운 할일을 추가해보세요!</p>
            </div>
          ) : (
            <div className="todo-list">
              {todos.map((todo, index) => (
                <div
                  key={todo.todoNo}
                  className={`todo-item ${
                    todo.complete === "Y" ? "완료" : "미완료"
                  }`} // ← complete 필드
                >
                  <div className="todo-number">{index + 1}</div>

                  <div className="todo-content">
                    <h4
                      className={todo.complete === "Y" ? "completed-title" : ""}
                    >
                      {" "}
                      {/* ← complete 필드 */}
                      {todo.todoTitle}
                    </h4>
                    {todo.todoContent && (
                      <p className="todo-description">{todo.todoContent}</p>
                    )}
                    <div className="todo-meta">
                      <span className="todo-date">📅 {todo.regDate}</span>
                      <span
                        className={`todo-status ${
                          todo.complete === "Y" ? "completed" : "active"
                        }`}
                      >
                        {" "}
                        {/* ← complete 필드 */}
                        {todo.complete === "Y" ? "✅ 완료됨" : "⏳ 진행중"}{" "}
                        {/* ← complete 필드 */}
                      </span>
                    </div>
                  </div>

                  <div className="todo-actions">
                    <button
                      onClick={() => handleToggleComplete(todo)}
                      className={`btn-toggle ${
                        todo.complete === "Y" ? "completed" : "active"
                      }`} // ← complete 필드
                    >
                      {todo.complete === "Y" ? "↩️ 미완료로" : "✅ 완료로"}{" "}
                      {/* ← complete 필드 */}
                    </button>

                    <Link to={`/todo/${todo.todoNo}`} className="btn-detail">
                      📖 상세보기
                    </Link>

                    <button
                      onClick={() => handleDeleteTodo(todo)}
                      className="btn-delete"
                    >
                      🗑️ 삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
