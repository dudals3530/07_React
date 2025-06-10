import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../services/todoApi";

const TodoDetail = () => {
  const { todoNo } = useParams(); // URL 에서 todoNo 가져오기
  const navigate = useNavigate(); // 페이지 이동용

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // 수정 폼상태
  const [editForm, setEditForm] = useState({
    todoTitle: "",
    todoContent: "",
  });

  useEffect(() => {
    loadTodoDetail();
  }, [todoNo]);

  // 할일 상세조회 ..
  const loadTodoDetail = async () => {
    try {
      console.log("할일 상세정보 조회중 .. todoNo :", todoNo);
      setLoading(false);

      const todoDetail = await todoApi.getTodoDetail(todoNo);
      console.log("불러온상세정보 ", todoDetail);

      setTodo(todoDetail);
      setEditForm({
        todoTitle: todoDetail.todoTitle,
        todoContent: todoDetail.todoContent,
      });
    } catch (error) {
      console.log("할일상세조회중 에러발생!", error);
      alert("할일상세조회중 에러발생");
      navigate("/"); //홈으로 이동
    } finally {
      setLoading(false);
    }
  };

  //할일 수정 (완전한 객체 생성하여 전달.)
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (editForm.todoTitle.trim() === "") {
      alert("제목을 입력하시오");
      return;
    }

    if (editForm.todoContent.trim() === "") {
      alert("할일 상세를 입력하시오");
      return;
    }

    try {
      // 핵심 !!!!! : 완전한 객체 생성 (기존정보 + 수정할정보)
      const updatedTodo = {
        ...todo, // 여기서 쓰는군 ,,
        todoTitle: editForm.todoTitle.trim(),
        todoContent: editForm.todoContent.trim(),
      };

      const result = await todoApi.updateTodo(updatedTodo);

      if (result > 0) {
        console.log("할일수정성공!!");
        setTodo(updatedTodo);
        setLoading("false");
        alert("할일이 수정되었습니다");
        navigate("/");
      } else {
        alert("할일수정이 실패되었습니다.");
      }
    } catch (error) {
      console.log("할일 수정중 에러발생!", error);
      alert("할일 수정중 에러발생");
    }
  };

  // 할일 삭제
  const handleDelete = async () => {
    if (!window.confirm(`${todo.todoTitle}를 정말삭제하시겠습니까?`)) {
      return;
    }

    try {
      console.log("할일삭제시작! ..");

      const result = await todoApi.deleteTodo(todo);

      if (result > 0) {
        alert("삭제성공!!");
        navigate("/"); //홈으로이동
      }
    } catch (error) {
      console.log("할일 삭제중 에러발생!", error);
      alert("할일 삭제중 에러발생!");
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <h2>할일 정보 불러오는듕 ..</h2>
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="error">
        <h2> 할일을 찾을수 없습니다!!</h2>
        <Link to="/" className="btn-home">
          홈으로가기
        </Link>
      </div>
    );
  }

  return (
    <div className="detail">
      <div className="container">
        {/* 뒤로가기 및 제목 */}
        <div className="detail-header">
          <Link to="/" className="btn-back">
            ← 할일 목록으로 돌아가기
          </Link>
          <h2>할일 상세보기</h2>
        </div>

        {editing ? (
          /* 수정 모드 */
          <div className="edit-mode">
            <h3>✏️ 할일 수정</h3>
            <form onSubmit={handleUpdate} className="edit-form">
              <div className="form-group">
                <label htmlFor="editTitle">할일 제목 *</label>
                <input
                  id="editTitle"
                  type="text"
                  value={editForm.todoTitle}
                  onChange={(e) =>
                    setEditForm({ ...editForm, todoTitle: e.target.value })
                  }
                  placeholder="할일 제목을 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="editContent">할일 내용</label>
                <textarea
                  id="editContent"
                  value={editForm.todoContent}
                  onChange={(e) =>
                    setEditForm({ ...editForm, todoContent: e.target.value })
                  }
                  placeholder="할일 내용을 입력하세요"
                  rows="5"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save">
                  💾 저장
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="btn-cancel"
                >
                  ❌ 취소
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* 보기 모드 */
          <div className="view-mode">
            <div className="detail-content">
              <div className="detail-main">
                <h3>{todo.todoTitle}</h3>
                <div className="detail-status">
                  <span
                    className={`status-badge ${
                      todo.todoComplete === "Y" ? "completed" : "active"
                    }`}
                  >
                    {todo.todoComplete === "Y" ? "✅ 완료됨" : "⏳ 진행중"}
                  </span>
                </div>
              </div>

              {todo.todoContent && todo.todoContent.trim() && (
                <div className="detail-description">
                  <h4>📄 상세 내용</h4>
                  <div className="content-box">
                    <p>{todo.todoContent}</p>
                  </div>
                </div>
              )}

              <div className="detail-meta">
                <div className="meta-item">
                  <strong>📅 등록일:</strong> {todo.regDate}
                </div>
                <div className="meta-item">
                  <strong>🔢 할일 번호:</strong> {todo.todoNo}
                </div>
                <div className="meta-item">
                  <strong>💾 완료 상태:</strong> {todo.todoComplete}
                  <small>
                    ({todo.todoComplete === "Y" ? "완료" : "미완료"})
                  </small>
                </div>
              </div>

              <div className="detail-actions">
                <button onClick={() => setEditing(true)} className="btn-edit">
                  ✏️ 수정하기
                </button>
                <button onClick={handleDelete} className="btn-delete">
                  🗑️ 삭제하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TodoDetail;
