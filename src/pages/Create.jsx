import React, { useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../redux/modules/memo";
import { styled } from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Create() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.data);

  const [user] = useAuthState(auth);

  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  return (
    <>
      <Header />
      <Container>
        <StForm
          onSubmit={(e) => {
            e.preventDefault();
            const newData = {
              id: nanoid(),
              title,
              content: contents,
              author: [user.email],
            };
            dispatch(addData(newData));
            navigate("/");
          }}
        >
          <div>
            <StInputTitle
              placeholder="제목"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <StTextareaDiv>
            <StTextarea
              placeholder="내용"
              value={contents}
              onChange={(e) => {
                setContents(e.target.value);
              }}
            />
          </StTextareaDiv>
          <StCreateBtn>추가하기</StCreateBtn>
        </StForm>
      </Container>
    </>
  );
}

const StForm = styled.form`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StInputTitle = styled.input`
  width: 100%;
  height: 60px;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  padding: 8px;
  box-sizing: border-box;
`;

const StTextareaDiv = styled.div`
  height: 400px;
`;

const StTextarea = styled.textarea`
  resize: none;
  height: 100%;
  width: 100%;
  font-size: 18px;
  border-radius: 12px;
  border: 1px solid lightgrey;
  padding: 12px;
  box-sizing: border-box;
`;

const StCreateBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  color: white;
  border-radius: 12px;
  background-color: skyblue;
  cursor: pointer;
`;
