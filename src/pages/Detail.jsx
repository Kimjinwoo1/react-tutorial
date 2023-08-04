import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useMutation, useQueryClient } from "react-query";
import { deleteMemo } from "../api/memo";

export default function Detail({ data, isLoading, isError }) {
  const navigate = useNavigate();
  // 수정사항 아이디값 추출
  const { id } = useParams();
  // console.log("id=>", id);

  const findData = data.find((item) => item.id == id);
  // console.log("findData=>", findData);

  const [user] = useAuthState(auth);

  const queryClient = useQueryClient();

  const mutation = useMutation((id) => deleteMemo(id), {
    onSuccess: () => {
      queryClient.refetchQueries("memo");
      // 이거 이해가안됨 mutation 부분에서 완료되고 navigate가 안되서
      // 혹시나해서 성공했을때 여기부분으로 옴겨서 해봤는데 navigate()가작동이됨
      // 와이 아래는 안되는걸깝슈
      // 아래 else 밖에서도 작동은하고 여기서도 작동은된다 3항연산자 안에서만안될까..? redux사용했을떄는됬는데
      navigate("/");
    },
  });

  // if문중첩을 사용하지말라고 해서 따로 빼서 3항연산자로사용함.
  // 로그인이 안되었을때 오류가 나서 if문으로 분리함
  const handleDelete = () => {
    if (!user) {
      alert("로그인이 필요합니다.");
    } else {
      const userAuthor = findData.author === user.email;
      userAuthor
        ? window.confirm("삭제하시겠습니까?") && mutation.mutate(findData.id)
        : alert("본인 게시물만 삭제할 수 있습니다.");
    }
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (isError) {
    return <div>오류발생!!!!!!!!!!!!!!!!!!!!!</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <div>
          <StContainerH1>{findData?.title}</StContainerH1>
          <StContentDiv>
            <p>{findData?.content}</p>
          </StContentDiv>
          <StButtonDiv>
            <StEditButton
              onClick={() => {
                if (!user) {
                  alert("로그인이 필요합니다");
                } else if (findData.author == user.email) {
                  navigate("/edit", {
                    state: {
                      findData,
                    },
                  });
                } else {
                  alert("본인 게시물이 아닙니다.");
                }
              }}
            >
              수정
            </StEditButton>

            <StDeleteButton onClick={handleDelete}>삭제</StDeleteButton>
          </StButtonDiv>
        </div>
      </Container>
    </>
  );
}

const StContainerH1 = styled.h1`
  border: 1px solid lightgray;
  border-radius: 12px;
  padding: 12px;
`;

const StContentDiv = styled.div`
  height: 400px;
  border: 1px solid lightgray;
  border-radius: 12px;
  padding: 12px;
`;

const StButtonDiv = styled.div`
  margin-top: 12px;
  display: flex;
  justify-content: end;
`;

const StEditButton = styled.button`
  border: none;
  padding: 8px;
  border-radius: 6px;
  background-color: orange;
  color: white;
  cursor: pointer;
  margin-right: 6px;
`;

const StDeleteButton = styled.button`
  border: none;
  padding: 8px;
  border-radius: 6px;
  background-color: red;
  color: white;
  cursor: pointer;
`;
