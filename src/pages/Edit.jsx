import React, { Fragment, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useLocation, useNavigate } from "react-router-dom";

import {} from "../redux/modules/memo";
import { styled } from "styled-components";
import { editMemo } from "../api/memo";
import { useMutation, useQueryClient } from "react-query";

export default function Edit() {
  // const data = useSelector((state) => state.dataSlice);

  const { state } = useLocation();
  console.log("state=>", state);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [editTitle, editSetTitle] = useState(state?.findData?.title || "");
  const [editContent, editSetContent] = useState(
    state?.findData?.content || ""
  );

  const editMemoMutation = useMutation(
    (updateMemo) => editMemo(state.findData.id, updateMemo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("memo");
        navigate("/");
      },
    }
  );

  const submitHandler = (e) => {
    e.preventDefault();
    const updateMemo = {
      //url로 접근을하면 state가 없을수도있다.
      id: state.findData.id,
      title: editTitle,
      content: editContent,
    };
    editMemoMutation.mutate(updateMemo);
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
