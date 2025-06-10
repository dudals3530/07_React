import { api } from "./api";

export const todoApi = {
  getTodoList: async () => {
    // 투두 리스트 조회
    const response = await api.get("/selectList");
    return response.data;
  },

  addTodo: async (todo) => {
    // 투두 추가
    const todoForServer = {
      ...todo,
      complete: "N", // 추가할떄 완료상태 는 N 으로 추가
    };
    const response = await api.post("/add", todoForServer);
    return response.data;
  },

  toggleComplete: async (todo) => {
    // 완료여부 변경
    const updatedTodo = {
      ...todo,
      complete: todo.complete === "Y" ? "N" : "Y",
    };
    const response = await api.put("/changeComplete", updatedTodo);
    return response.data;
  },

  updateTodo: async (todo) => {
    // 투두 수정
    const response = await api.put("/update", todo);
    return response.data;
  },

  deleteTodo: async (todo) => {
    // 투두 삭제
    const response = await api.delete(`/delete/${todo.todoNo}`);
    return response.data;
  },

  getTodoDetail: async (todoNo) => {
    //투두 상세조회
    const response = await api.get(`/detail?todoNo=${todoNo}`);
    return response.data;
  },
};
