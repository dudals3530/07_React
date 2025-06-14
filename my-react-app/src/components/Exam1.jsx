// 컴포넌트 파일들은 보통 대문자로 시작함 ㅇ..
// 리엑트 19 버전 업 되면서 , 파일명.js 는 안씀 그래서 공부할때 js 로 되어있으면 jsx로 생각하면됨

import { Component } from "react";
import App from "./../App";

// ------------------
// 클래스형 컴포넌트 Exam1 정의
class Exam1 extends Component {
  //  export class Exam2 extends Component {
  //   // React.Component 클래스 상속받아 클래스형 컴포넌트 정의
  // 이런식으로 도 쓰임
  // }
  // React.Component 클래스 상속받아 클래스형 컴포넌트 정의

  // 생성자 정의 . props는 부모 컴포넌트로부터 전달받은 데이터
  constructor(props) {
    super(); // 부모 클래스 (컴포넌트)의 생성자를 호출.

    //this.state : 클래스형 컴포넌트에서 컴포넌트의 상태(state) 객체를 의미함.
    this.state = { count: 0 }; // state(상태) 중 count 상태값을 0으로 초기화
    console.log("생성자 호출");
  }

  // 생명주기 코드

  // 컴포넌트가 처음 화면에 나타났을때
  componentDidMount() {
    console.log("componentDidMount : 마운트 완료");
  }

  // props나 state가 변경된 후
  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate : 업데이트 완료");
    console.log("이전 state: ", prevState.count);
    console.log("현재 state : ", this.state.count);
  }

  // 컴포넌트가 화면에서 제거될때
  componentWillUnmount() {
    console.log("componentWillUnmount : 언마운트됨");
  }

  //클래스형 컴포넌트 문법으로 정의된 함수.
  // 버튼 클릭시 호출되는 이벤트 핸들러 함수
  handleClick = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // 렌더링 메서드. JSX를 반환하여 화면에 UI 렌더링(그린다)
  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleClick}>증가 버튼</button>

        <h2>
          부모로부터 전달받은값 : {this.props.youngmin} {this.props.test}
        </h2>
      </div>
    );
  }
}

// 다른 파일에서 해당 파일(Exam1.jsx)의 기본으로 지정된 컴포넌트(Exam1)를 사용할 수 있도록
// 내보냄
export default Exam1; // 내보내겟다
