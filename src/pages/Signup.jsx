import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const passwordConfirmHandler = (e) => {
    setPasswordConfirm(e.target.value);
  };

  const sigUp = async (e) => {
    e.preventDefault();

    // 한번더 찾아보기
    const validateEmail = (email) => {
      const emailPatten = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPatten.test(email);
    };

    if (!email) {
      alert("이메일을 입력해주세요");
      return;
    }

    if (!validateEmail(email)) {
      alert("이메일 형식이 올바르지 않습니다");
      return;
    }

    if (!password || !passwordConfirm) {
      alert("비밀번호 또는 비밀번호 확인란을 입력해주세요! ");
      return;
    }

    if (password !== passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      // firebase 공식문서에 나와있음 fetchSignInMethodsForEmail(auth, email);
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      // Friebase인증 시스템에서 이메일을 못찾거나 없으면 0
      // 이메일이 발견되면 해당이메일에 연결된 로그인 방법을 포함한 배열을 반환하니깐 0보다 크다
      if (signInMethods.length > 0) {
        alert("이미 사용 중인 이메일 입니다.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("회원가입이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // 구체적으로 어떤 error가 발생했는지 보여준다. 위에러코드를 한글로 변환해서
      if (errorCode === "auth/operation-not-allowed") {
        alert("이메일/비밀번호 로그인을 사용할 수 없습니다. 휴먼계정");
      } else if (errorCode === "auth/weak-password") {
        alert("비밀번호가 6자리 이하입니다.");
      } else if (errorCode === "auth/too-many-requests") {
        alert("너무 많은 로그인 시도로 인해 잠시 후에 다시 시도해주세요.");
      } else if (errorCode === "auth/network-request-failed") {
        alert("인터넷 연결 문제로 인해 로그인 요청에 실패했습니다.");
      } else {
        alert("알수없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    }
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
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
          <form onSubmit={sigUp}>
            <div
              style={{
                width: "360px",
                marginBottom: "12px",
              }}
            >
              <input
                value={email}
                onChange={emailHandler}
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
                value={password}
                onChange={passwordHandler}
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
              <input
                value={passwordConfirm}
                onChange={passwordConfirmHandler}
                placeholder="비밀번호 확인"
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
                  backgroundColor: "#FF6969",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                회원가입하기
              </button>
            </div>
            <div
              style={{
                width: "360px",
              }}
            >
              <button
                onClick={() => {
                  navigate("/login");
                }}
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
                로그인하러 가기
              </button>
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}
