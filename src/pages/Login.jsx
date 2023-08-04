import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function Login() {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    if (!loginEmail) {
      alert("이메일을 입력하세요");
      return;
    }

    if (!loginPassword) {
      alert("비밀번호를 입력하세요");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      alert("로그인이 되었습니다.");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      // 공식문서에서 찾아서 각각 추가 ex)서버문제등등..
      if (errorCode === "auth/wrong-password") {
        alert("비밀번호가 틀렸습니다. 다시 시도해주세요.");
      } else if (errorCode === "auth/invalid-email") {
        alert("올바르지 않은 이메일 주소 형식입니다.");
      } else if (errorCode === "auth/user-disabled") {
        alert("사용자 계정이 비활성화되었습니다.");
      } else if (errorCode === "auth/user-not-found") {
        alert("해당 이메일 주소로 등록된 사용자를 찾을 수 없습니다.");
      } else if (errorCode === "auth/too-many-requests") {
        alert("너무 많은 로그인 시도로 인해 잠시 후에 다시 시도해주세요.");
      } else if (errorCode === "auth/network-request-failed") {
        alert("인터넷 연결 문제로 인해 로그인 요청에 실패했습니다.");
      } else if (errorCode === "auth/operation-not-allowed") {
        alert("이메일/비밀번호 로그인을 사용할 수 없습니다.");
      } else {
        alert("알수 없는 오류가 발생했습니다. 나중에 다시 시도해주세요");
      }
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "600px",
            alignItems: "center",
          }}
        >
          <form onSubmit={signIn}>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                value={loginEmail}
                onChange={(e) => {
                  setLoginEmail(e.target.value);
                }}
                placeholder="이메일"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                value={loginPassword}
                onChange={(e) => {
                  setLoginPassword(e.target.value);
                }}
                placeholder="비밀번호"
                type="password"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  borderRadius: "8px",
                  border: "1px solid lightgrey",
                  padding: "8px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <button
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#78C1F3",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                로그인하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                onClick={() => {
                  navigate("/signup");
                }}
                style={{
                  width: "100%",
                  border: "none",
                  padding: "12px",
                  borderRadius: "6px",
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                회원가입하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
