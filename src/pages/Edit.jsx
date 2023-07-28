import React, { Fragment, useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editData } from "../redux/modules/memo";
import { styled } from "styled-components";

export default function Edit() {
  const data = useSelector((state) => state.dataSlice);

  const dispatch = useDispatch();

  const { id } = useParams();
  const findItem = data.find((item) => item.id === id);
  // 없으면 문자열로한다 아님 옵셔널체이닝을 걸어준다.
  const [editTitle, editSetTitle] = useState(findItem?.title || "");
  const [editContent, editSetContent] = useState(findItem?.content || "");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const newData = {
      id: id,
      title: editTitle,
      content: editContent,
    };
    dispatch(editData(newData));
    navigate("/");
  };

  return (
    <Fragment>
      <Header />
      <Container>
        <StEditForm onSubmit={submitHandler}>
          <div>
            <StTitleInput
              placeholder="제목"
              value={editTitle}
              onChange={(e) => {
                editSetTitle(e.target.value);
              }}
            />
          </div>
          <StTextareaDiv>
            <StTextarea
              placeholder="내용"
              value={editContent}
              onChange={(e) => {
                editSetContent(e.target.value);
              }}
              style={{}}
            />
          </StTextareaDiv>
          <StEditBtn>수정하기</StEditBtn>
        </StEditForm>
      </Container>
    </Fragment>
  );
}

const StEditForm = styled.form`
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StTitleInput = styled.input`
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

const StEditBtn = styled.button`
  width: 100%;
  height: 40px;
  border: none;
  color: white;
  border-radius: 12px;
  background-color: orange;
  cursor: pointer;
`;
