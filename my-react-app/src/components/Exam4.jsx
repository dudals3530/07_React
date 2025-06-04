// 상태 끌어올리기 (State lifting up) : 자식 컴포넌트의 상태를 부모에게 끌어올려
//                                   부모가 이용 가능하도록 해주는것

import { useState } from "react";

// 부모 컴포넌트
const Exam4 = () => {
  // 자식 컴포넌트의 상태 id, pw 를 부모로 끌어올려 작성
  //상태
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  // 자식 컴포넌트의 상태 변경 함수도 부모로 끌어롤려 작성
  //ID 상태를 업데이트 해주는 함수
  const onChangeId = (e) => {
    setId(e.target.value);
  };

  //Pw라는 상태를 업데이트 해주는 함수
  const onChangePw = (e) => {
    setPw(e.target.value);
  };
  return (
    <div>
      {/* 자식 컴포넌트에서 사용중인 함수를 props를 통해전달 */}
      <Id onChangeId={onChangeId} />
      <Pw onChangePw={onChangePw} />
      <div>
        {/* 자식이 가직 id, pw라는 상태값을 부모 컴포넌트가 알방법이 없음! 
          -> 부모 컴포넌트로 자식의상태,  함수를 끌어올려 사용 
        */}
        <button disabled={id.length === 0 || pw.length === 0}>Login</button>
      </div>
    </div>
  );
};

// 자식 컴포넌트 ID
const Id = (props) => {
  return (
    <div>
      <label>ID : </label>
      {/* props에 담긴 onChangeId 라는 key에 매핑된 value 값(함수) 사용 */}
      <input onChange={props.onChangeId} />
    </div>
  );
};

// 자식 컴포넌트 Pw
const Pw = ({ onChangePw }) => {
  return (
    <div>
      <label>Pw:</label>
      <input type="password" onChange={onChangePw} />
    </div>
  );
};

export default Exam4;
