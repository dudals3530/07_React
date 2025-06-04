import React, { useEffect, useState } from "react";
import { axiousApi } from "../api/axiousAPI";

export default function Manager() {
  //이메일, 닉네임 , 전화번호
  // 객체 하나로 상태 관리하는 방식
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    tel: "", // js 객체로 초기값 세팅
  });
  //관리자 계정목록 받아줄 상태
  const [manageForm, setManageForm] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  //AdminMEmbers 컴포넌트 (return 문 이전에 정의)
  const AdminMembers = ({ manageForm }) => {
    if (!manageForm || manageForm.length === 0) {
      return <h2>등록된 관리자가 없습니다.</h2>;
    }

    return (
      <table className="manager-list-table" border={1}>
        <tr>
          <th>번호</th>
          <th>이메일</th>
          <th>관리자명</th>
        </tr>
        {manageForm.map((admin, index) => (
          <tr key={admin.id || index}>
            <td>{admin.memberNo}</td>
            <td>{admin.memberEmail}</td>
            <td>{admin.memberNickname}</td>
          </tr>
        ))}
      </table>
    );
  };

  const getadminList = async () => {
    try {
      const resp = await axiousApi.get("/admin/getadminList");

      if (resp.status == 200) {
        setManageForm(resp.data);
      }
    } catch (error) {
      console.log("관리자 조회중 에러발생", error);
      setManageForm([]);
    }
  };

  //관리자 계정 발급
  async function createAdminAccount() {
    const { email, nickname, tel } = form; //form 상태안에 있는 값들 하나씩 꺼내옴

    if (email.length === 0 || nickname.length === 0 || tel.length === 0) {
      alert("모든 필드를 입력해주세요!");
      return;
    }

    try {
      const response = await axiousApi.post("/admin/createAdminAccount", {
        memberEmail: email,
        memberNickname: nickname,
        memberTel: tel, // 이런식으로 하면 우리가만들어논 DTO로 받을수있음
      });

      if (response.status === 201) {
        const result = response.data; // 서버에서 응답해준 데이터(body)
        alert(
          `발급된 비밀번호는 ${result}입니다.  다시 확인할수 없으니 저장해주시기 바랍니다.`
        );
        console.log(result);
      }

      // 입력필드 초기화
      setForm({ email: "", nickname: "", tel: "" });
      getadminList();   // 이게없었음
    } catch (error) {
      alert(error.response.data);
      // 409일때 , 500일떄 응답받은 body 내용이 반영되어 alert 출력할 수 잇게끔함
      // 409 는 "conflict" 상태코드 중복값 충돌
    }
  }

  //객체 형태 상태 변경 함수
  const handleChange = (e) => {
    const { id, value } = e.target; // 대사의 id속성값, value값을 꺼내옴

    console.log({ id, value });
    setForm((prev) => ({
      ...prev, //기존 상태를 기억함
      [id]: value,
    }));
  };

  useEffect(() => {
    getadminList();
  }, []);

  useEffect(() => {
    if (manageForm != null) {
      setIsLoading(false);
    }
  }, [manageForm]);

  if (isLoading) {
    // ✅ 상태값으로 조건 확인
    return <h1>Loading ...</h1>;
  } else {
    return (
      <>
        <div className="manager-div">
          <section className="manager-section">
            <h2>관리자 계정 발급</h2>
            <table>
              <tr>
                <td>사용할 이메일 : </td>
                <td>
                  <input
                    id="email"
                    type="email"
                    placeholder="ex) admin2@kh.or.kr"
                    value={form.email}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>사용할 이름 : </td>
                <td>
                  <input
                    id="nickname"
                    type="text"
                    placeholder="ex) 관리자2"
                    value={form.nickname}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>사용할 전화번호 : </td>
                <td>
                  <input
                    id="tel"
                    type="text"
                    placeholder="ex) 01012341234"
                    value={form.tel}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </table>
            <button className="issueBtn" onClick={createAdminAccount}>
              발급
            </button>
          </section>

          <section className="manager-section">
            <h2>관리자 계정 목록</h2>

            <AdminMembers manageForm={manageForm} />
          </section>
        </div>
      </>
    );
  }
}
