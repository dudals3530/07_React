import { api } from "./api";

export const todoApi = {

  /*
    Todo 관련 API 호출 함수들 !
    - 서버와의 모든 통신을 담당! 
    - 각 함수는 특정 기능을 수행
  
  */



    // 투두 리스트 조회
    // GET/ajax/selectList
  getTodoList: async () => {
    
    const response = await api.get("/selectList");
    return response.data; // 서버에서 받은 할일 배열
  },



  // 투두 추가
  // POST/ajax/add
  addTodo: async (todo) => {
    
    const todoForServer = {
      ...todo,  // 기존 데이터 복사
      complete: "N", // 추가할떄 완료상태 는 N 으로 추가
    };
    const response = await api.post("/add", todoForServer);
    return response.data; // 성공시 1 , 실패시 0
  },


  // 완료여부 변경
  // PUT/ajax/changeComplete
  toggleComplete: async (todo) => {
    
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
