import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiousApi } from "../api/axiousAPI";

export default function Restore() {
  const [withdrawnMembers, setwithdrawnMembers] = useState(null); //탈퇴 회원 목록
  const [deleteBoard, setDeleteBoard] = useState(null); // 삭제게시글목록
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  // 로딩상태 관련
  // 상태값 null - > 서버에게 응답 받기전
  // 상태값 [] => 서버에게 응답은 받았지만 빈배열은 (조회된 데이터가없음)!!
  // 상태값 [요소] -> 서버에게 응답또한 받았고 배열은 조회된 데이터가있음!!

  // 탈퇴한 회원 목록 조회용 함수
  const getWithdrawnMemberList = async () => {
    try {
      const resp = await axiousApi.get("/admin/withdrawnMemberList");
      console.log(resp.data);
      if (resp.status === 200) {
        setwithdrawnMembers(resp.data);
      }
    } catch (error) {
      console.log("탈퇴회원 목록 조회중 에러 발생 : ", error);
      setwithdrawnMembers([]);
    }
  };

  // 탈퇴한 회원 복구 요청 함수
  const restoreMember = async (member) => {
    // 복구요청
    // 복구 되었음 하고 응답옴
    // ->
    if (
      window.confirm(member.memberNickname + "님을 탈퇴 복구 시키겠습니까?")
    ) {
      try {
        const resp = await axiousApi.put("/admin/restoreMember", {
          memberNo: member.memberNo,
        });
        if (resp.status === 200) {
          alert("복구되었습니다!");
          getWithdrawnMemberList(); // 꼭 필요함!
          // 복구된 데이터 (업데이트 된 내역을 확인하기 위해서)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  //삭제된 게시글 목록 조회용 함수
  const getDeleteBoardList = async () => {
    try {
      const resp = await axiousApi.get("/admin/deleteBoardList");

      console.log(resp.data);
      if (resp.status === 200) {
        setDeleteBoard(resp.data);
      }
    } catch (error) {
      console.log("삭제된게시글 목록 조회중 에러 발생 : ", error);
      setDeleteBoard([]);
    }
  };
  //삭제된 게시글 복구 요청 함수

  const restoreBoard = async (board) => {
    // 복구요청
    // 복구 되었음 하고 응답옴
    // ->
    if (window.confirm(board.boardNo + "게시글을 복구 시키겠습니까?")) {
      try {
        const resp = await axiousApi.put("/admin/restoreBoard", {
          boardNo: board.boardNo,
        });
        if (resp.status === 200) {
          alert("복구되었습니다!");
          getDeleteBoardList(); // 꼭 필요함!
          // 복구된 데이터 (업데이트 된 내역을 확인하기 위해서)
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Restore 컴포넌트가 처음 레더링 될 때
  useEffect(() => {
    getWithdrawnMemberList();
    getDeleteBoardList();
  }, []);

  // withdrawnMembers , deleteBoard 상태가 변경될 떄 실행 (isLoading 값 변경)

  useEffect(() => {
    if (withdrawnMembers != null && deleteBoard != null) {
      setIsLoading(false);
    }
  }, [withdrawnMembers, deleteBoard]);

  // 🚨 수정: return 문 추가
  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="menu-box">
        <RestoreMember
          withdrawnMembers={withdrawnMembers}
          restoreMember={restoreMember}
        />
        <RestoreBoard deleteBoard={deleteBoard} restoreBoard={restoreBoard} />
      </div>
    );
  }
}

const RestoreMember = ({ withdrawnMembers, restoreMember }) => {
  return (
    <section className="section-border">
      <h2>탈퇴 회원 복구</h2>
      <h3>탈퇴한 회원 목록</h3>

      {withdrawnMembers.length === 0 ? (
        <p>탈퇴한 회원이 없습니다</p>
      ) : (
        withdrawnMembers.map((member, index) => {
          return (
            <ul className="ul-board" key={index}>
              <li>회원 번호 : {member.memberNo}</li>
              <li>회원이메일 : {member.memberEmail}</li>
              <li>회원 닉네임 : {member.memberNickname}</li>
              <button
                className="restoreBtn"
                onClick={() => restoreMember(member)}
              >
                복구
              </button>
            </ul>
          );
        })
      )}
    </section>
  );
};

const RestoreBoard = ({ restoreBoard, deleteBoard }) => {
  return (
    <section className="section-border">
      <h2>삭제 게시글 복구</h2>
      <h3>삭제된 게시글 목록</h3>

      {deleteBoard.length === 0 ? (
        <p>삭제된 게시글이 없습니다</p>
      ) : (
        deleteBoard.map((board, index) => {
          return (
            <ul className="ul-board" key={index}>
              <li>게시글 번호 : {board.boardNo}</li>
              <li>게시글 카테고리 : {board.boardName}</li>
              <li>게시글 제목 : {board.boardTitle}</li>
              <li>게시글 닉네임 : {board.memberNickname}</li>
              <button
                className="restoreBtn"
                onClick={() => restoreBoard(board)}
              >
                복구
              </button>
            </ul>
          );
        })
      )}
    </section>
  );
};
