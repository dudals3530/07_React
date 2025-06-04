import React, { useEffect, useState } from "react";
import { axiousApi } from "../api/axiousAPI";

export default function Statistics() {
  const [readCountData, setReadCountData] = useState(null);
  const [likeCountData, setLikeCountData] = useState(null);
  const [commentCountData, setCommentCountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newMember, setNewMember] = useState([]);

  const getNewMember = async () => {
    try {
      const resp = await axiousApi.get("admin/getNewMember");
      if (resp.status == 200) {
        setNewMember(resp.data);
      }
    } catch (error) {
      console.log("최근7일이내 회원조회중 에러발생 : ", error);
      setNewMember([]);
    }
  };

  // 최대 조회 수 게시글 조회
  const getMaxReadCount = async () => {
    try {
      const resp = await axiousApi.get("/admin/maxReadCount");
      console.log(resp.data);

      if (resp.status == 200) {
        // 🚨 수정: readCountData로 변경
        setReadCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 조회수 게시글 조회 중 예외 발생 :", error);
      setReadCountData(null); // 에러시 null로 설정
    }
  };

  // 최대 좋아요수 게시글 조회
  const getMaxLikeCount = async () => {
    try {
      const resp = await axiousApi.get("/admin/maxLikeCount");
      console.log(resp.data);

      if (resp.status == 200) {
        setLikeCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 좋아요수 게시글 조회 중 예외 발생 :", error);
      setLikeCountData(null); // 에러시 null로 설정
    }
  };

  // 최대 댓글수 게시글 조회
  const getMaxCommentCount = async () => {
    try {
      const resp = await axiousApi.get("/admin/maxCommentCount");
      console.log(resp.data);

      if (resp.status == 200) {
        setCommentCountData(resp.data);
      }
    } catch (error) {
      console.log("최대 댓글수 게시글 조회 중 예외 발생 :", error);
      setCommentCountData(null); // 에러시 null로 설정
    }
  };

  // 컴포넌트가 처음 마운트 될떄 딱 1번만 실행
  useEffect(() => {
    getMaxReadCount();
    getMaxLikeCount();
    getMaxCommentCount();
    getNewMember();
  }, []);

  // 모든 데이터가 로드되었는지 확인
  useEffect(() => {
    // 모든 API 호출이 완료되었는지 확인 (성공/실패 상관없이)
    if (
      readCountData !== undefined && // null이거나 데이터가 있거나
      likeCountData !== undefined &&
      commentCountData !== undefined &&
      Array.isArray(newMember) // newMember는 항상 배열
    ) {
      setIsLoading(false);
    }
  }, [readCountData, likeCountData, commentCountData, newMember]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <section className="statistics-section">
        <h2>신규 가입 회원({newMember.length}명)</h2>

        {/* 빈 배열 체크 및 조건부 렌더링 */}
        {newMember.length === 0 ? (
          <p className="no-data-message">
            최근 일주일 내에 회원가입한 사람이 없습니다.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>회원번호</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>가입일</th>
              </tr>
            </thead>
            <tbody>
              {newMember.map((member, index) => (
                <tr key={index}>
                  <td>{member.memberNo}</td>
                  <td>{member.memberEmail}</td>
                  <td>{member.memberNickname}</td>
                  <td>{member.enrollDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* 조회수 게시글 섹션 */}
      <section className="statistics-section">
        <h2>가장 조회수 많은 게시글</h2>
        {readCountData ? (
          <>
            <p>게시판 종류: {readCountData.boardName}</p>
            <p>
              게시글 번호: NO.{readCountData.boardNo}/{" "}
              {readCountData.boardTitle}
            </p>
            <p>게시글 조회 수: {readCountData.readCount}</p>
            <p>작성자 닉네임: {readCountData.memberNickname}</p>
          </>
        ) : (
          <p className="no-data-message">조회수 데이터를 불러올 수 없습니다.</p>
        )}
      </section>

      {/* 좋아요 게시글 섹션 */}
      <section className="statistics-section">
        <h2>가장 좋아요 많은 게시글</h2>
        {likeCountData ? (
          <>
            <p>게시판 종류: {likeCountData.boardName}</p>
            <p>
              게시글 번호: NO.{likeCountData.boardNo}/{" "}
              {likeCountData.boardTitle}
            </p>
            <p>게시글 좋아요 수: {likeCountData.likeCount}</p>
            <p>작성자 닉네임: {likeCountData.memberNickname}</p>
          </>
        ) : (
          <p className="no-data-message">좋아요 데이터를 불러올 수 없습니다.</p>
        )}
      </section>

      {/* 댓글 게시글 섹션 */}
      <section className="statistics-section">
        <h2>가장 댓글 많은 게시글</h2>
        {commentCountData ? (
          <>
            <p>게시판 종류: {commentCountData.boardName}</p>
            <p>
              게시글 번호: NO.{commentCountData.boardNo}/{" "}
              {commentCountData.boardTitle}
            </p>
            <p>게시글 댓글 수: {commentCountData.commentCount}</p>
            <p>작성자 닉네임: {commentCountData.memberNickname}</p>
          </>
        ) : (
          <p className="no-data-message">댓글 데이터를 불러올 수 없습니다.</p>
        )}
      </section>
    </div>
  );
}
