import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { hover } from "@testing-library/user-event/dist/hover";
import { styled } from "styled-components";

export default function Header() {
  const navigate = useNavigate();

  // useAuthState를 통해서 인증정보 접근, Firebase Auth 상태를 추적하는 데 사용할 수 있는 React 훅

  const [user] = useAuthState(auth);
  // console.log("user=>", user);

  const logOut = async (e) => {
    e.preventDefault();
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header
      style={{
        height: "100px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px 0 24px",
      }}
    >
      <h1
        style={{
          color: "gray",
          cursor: "pointer",
        }}
      >
        <FaHome
          onClick={() => {
            navigate("/");
          }}
        />
      </h1>
      <div
        style={{
          display: "flex",
          gap: "12px",
        }}
      >
        {user ? (
          <>
            {/* <Link to="/login" onClick={logOut}>
              로그아웃
            </Link> */}
            <StLogOutDiv onClick={logOut}>로그아웃</StLogOutDiv>
            <div>{user.email}</div>
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </>
        )}
        {/* // <Link to="/login">로그인</Link>
        // <Link to="/signup">회원가입</Link> */}
      </div>
    </header>
  );
}

const StLogOutDiv = styled.div`
  cursor: pointer;
`;
