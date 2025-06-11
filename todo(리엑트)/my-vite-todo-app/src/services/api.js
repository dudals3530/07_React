import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost/ajax",

  // 추가설정 예시 (필요시사용)
  // timeout: 10000,    10 초 타임아웃
  // headers : {"Content-Type" : "applicaition/json"} 공통헤더
});

// Axios 인스턴스 생성
// - 모든 API 요청의 기본 설정을 여기서 관리!!
// - baseURL : 모든 요청의 기본 주소
