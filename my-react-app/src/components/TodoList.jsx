// import { useState } from "react";
import { useState } from "react";
import TodoList from "./TodoList";

// // React만을 이용한 TodoList 예제
// const TodoList = () => {
//   // 작성한 todo를 기억할 List(배열) 상태값
//   const [todoList, setTodoList] = useState([]);
//   /*
//     [
//       {title:"input의 value값", isDone : true}
//       {title:"input의 value값", isDone : true}
//       {title:"input의 value값", isDone : true}
//       이런식으로
//     ]
//   */
//   const [inputValue, setInputValue] = useState("");

//   // Add Todo 버튼 클릭 시 TodoList 상태에 업데이트 이벤트 핸들러 함수
//   const handelAddTodo = () => {
//     // 전개역할로 ... todoList사용함
//     // (기존 TodoList가 가진 배열을 펼치고 뒤에새로운 요소를 그대로 추가)
//     setTodoList([...todoList, { title: inputValue, isDone: false }]);
//     setInputValue(""); // input창 값 비우기
//   };

//   //완료 / 미완료 상태 업데이트 이벤트 핸들러 함수
//   const handleToggleTodo = (index) => {
//     // Javascript spread 연산자 (...) : 기존 배열이나, 객체의 전체 또는 일부를
//     // 다른 배열이나 객체로 복사함.

//     // React는 불변성의 법칙 : React가 상태를 변경을 감지 해야하기 때문에
//     // 상태가 이전과 다르다고 React에게 알려주기 위해서는 상태의 참조값 (메모리 주소)
//     // 기존과 다르게 변경되어야함.
//     // -> 변경되기 이전 원본의 상태값은 불변해야하고, 새로운 참조 객체를 만들어
//     //    이가 변경되었음을 React 알려줌.

//     const newTodoList = todoList.map((todo, i) =>
//       // 현재 배열의 i 와 매개변수 index 가 같으면 변경된 내용으로,
//       // 같지 않으면 기존 todo 그대로 적용하여
//       // 새로운 배열을 만들어 반환

//       i === index ? { ...todo, isDone: !todo.isDone } : todo
//     );
//     setTodoList(newTodoList);
//   };

//   // todoList에 있는 현재 상태(todo요소)를 삭제하는 이벤트 핸들러 함수
//   const handleDeleteTodo = (index) => {
//     // 1. React는 상태원본을 변경해서는 안된다.
//     // 2. splice 함수 : mutates 함수라서 원본이 변경되는 함수이므로
//     // state인 todoList에 직접적 사용 안됨 (불변성의 법칙)

//     const newTodoList = [...todoList]; // todoList와 똑같은 배열 만들기 (복사)
//     //newTodoList.splice(어디서부터잘라낼것인지 index, 몇개자를것인지)

//     // 만약 여기서 filter를 쓴다면
//     //const newTodoList = todoList.filter((todo,i)=> i !==index);
//     // filter는 새로운 배열을 반환하므로 직접 원본 배열을 복사할 필요 x
//     // filter는 원본 배열 유지됨 (변경하지 않음!)
//     // filter는 map처럼 기존배열을 복사한채로 그대로 뱉어내고 조건식값은 true 면 keep 하고
//     //  false 면 keep 하지 않는다.
//     newTodoList.splice(index, 1);
//     setTodoList(newTodoList);
//   };

//   return (
//     <div>
//       <h1>나의 TodoList</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//       />
//       <button onClick={handelAddTodo}>Add Todo</button>

//       <ul>
//         {todoList.map((todo, index) => (
//           <li key={index}>
//             <span
//               style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
//             >
//               {todo.title}
//             </span>
//             <button onClick={() => handleToggleTodo(index)}>
//               {todo.isDone ? "미완료" : "완료"}
//             </button>
//             <button onClick={() => handleDeleteTodo(index)}>삭제</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// export default TodoList;

// /*
//       </span>
//             <button onClick={() => handleToggleTodo(index)}>
//               {todo.isDone ? "미완료" : "완료"}
//             </button>
//             <button onClick={() => handleDeleteTodo(index)}>삭제</button>
//           </li>
//            여기서콜백함수를 쓰는건 콜백함수를 쓰는이유 :
//            여기서바로 함수호출을 해버리면 렌더링되자마자 함수가 호출되버림
//            난 이벤트를 실행됬을떄 실행을 하고싶어서 렌더링 되자마자 호출시키면안되고
//            콜백함수를 넣어서 이이벤트가 실행됫을떄 함수를 호출하는 방식으로
//            한단계 건너띈다는 ?? 느낌으로 콜백함수를 이용해 만들어줌

//            const handleDeleteTodo = (index) => {
//     // 1. React는 상태원본을 변경해서는 안된다.
//     // 2. splice 함수 : mutates 함수라서 원본이 변경되는 함수이므로
//     // state인 todoList에 직접적 사용 안됨 (불변성의 법칙)

//     const newTodoList = [...todoList]; // todoList와 똑같은 배열 만들기 (복사)
//     //newTodoList.splice(어디서부터잘라낼것인지 index, 몇개자를것인지)
//     newTodoList.splice(index, 1);
//     setTodoList(newTodoList);

//   };

// */

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    setTodoList(...todoList, { title: inputValue, isDone: false });
    setInputValue(""); 
  };

  const handleToggleTodo = (index) =>{
    const newTodoList = todoList.map((todo,i) =>
     i === index ? {...todo, isDone : !todo.isDone} : todo
    )
    setTodoList(newTodoList);
  }

  const handleDeleteTodo = (index) => {
    const newTodoList = [...todoList];
    

  }

  return (
    <div>
      <h1>나의 투두리스트</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add todo</button>

       <ul>
        {todoList.map((todo,index) => {
          return(
            <li key={index}>
              <span style={{textDecoration : todo.isDone ? "line-through" : "none" }}>{todo.title}</span>
              <button onClick={()=>handleToggleTodo(index)}>{todo.isDone ? "미완료": "완료"}</button>
              <button onClick={()=>handleDeleteTodo(index)}>삭제</button>
            </li>
          )
        })}
       </ul>
    </div>
  );
};
export default TodoList;
