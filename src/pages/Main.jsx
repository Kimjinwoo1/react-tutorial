import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { styled } from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useMutation, useQueryClient } from "react-query";
import { deleteMemo } from "../api/memo";

export default function Main({ data, isLoading, isError }) {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  // id로 deleteMemo에 넣어줌으로써 api에 작성한 곳으로 보내서 삭줴
  const mutation = useMutation((id) => deleteMemo(id), {
    onSuccess: () => {
      queryClient.refetchQueries("memo");
    },
  });

  if (isLoading) {
    return <div>로딩중..</div>;
  }

  if (isError) {
    return <div>오류가 발생했숨다</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <StContainerDiv>
          <StContainerButton
            onClick={() => {
              {
                user ? navigate("/create") : alert("로그인이 필요합니다.");
              }
            }}
          >
            추가
          </StContainerButton>
        </StContainerDiv>
        {/* 초기값 형성해 놓은 걸 map 함수로 화면에뿌리기 */}
        {data.map((findData) => {
          // console.log("memo=>", memo);
          return (
            <StMainDiv key={findData.id}>
              <StCardDiv
                onClick={() => {
                  navigate(`/detail/${findData.id}`);
                }}
              >
                <h2>{findData.title}</h2>
                <StContentP>{findData.content}</StContentP>
              </StCardDiv>
              <StAuthorDiv>
                {/* 나중에 확인 */}
                <div>{findData.author}</div>
                <div>
                  <StEditButton
                    onClick={() => {
                      // 클릭시 게시물의 author와 로그인한 이메일이 일치할때만 이동구현.
                      if (!user) {
                        alert("로그인이 필요합니다.");
                      } else if (findData.author === user.email) {
                        navigate("/edit", {
                          state: {
                            findData,
                          },
                        });
                      } else {
                        alert("본인 게시물이 아닙니다.");
                      }
                    }}
                    style={{
                      border: "none",
                      padding: "8px",
                      borderRadius: "6px",
                      backgroundColor: "orange",
                      color: "white",
                      cursor: "pointer",
                      marginRight: "6px",
                    }}
                  >
                    수정
                  </StEditButton>

                  <StDeleteButton
                    onClick={() => {
                      if (!user) {
                        alert("로그인이 필요합니다.");
                      } else if (findData.author == user.email) {
                        // console.log("findData.author=>", findData.author);
                        // console.log("user.email=>", user.email);
                        if (window.confirm("삭제하시겠습니까?")) {
                          mutation.mutate(findData.id);
                        }
                      } else {
                        alert("본인 게시물만 삭제할수 있습니다.");
                      }
                    }}
                  >
                    삭제
                  </StDeleteButton>
                </div>
              </StAuthorDiv>
            </StMainDiv>
          );
        })}
      </Container>
    </>
  );
}

const StContainerDiv = styled.div`
  display: flex;
  justify-content: end;
  padding: 12px;
`;

const StContainerButton = styled.button`
  border: none;
  padding: 8px;
  border-radius: 6px;
  background-color: skyblue;
  color: white;
  cursor: pointer;
`;

const StMainDiv = styled.div`
  background-color: #eeeeee;
  height: 100px;
  border-radius: 24px;
  margin-bottom: 12px;
  display: flex;
  padding: 12px 16px 12px 16px;
`;

const StCardDiv = styled.div`
  flex: 4;
  border-right: 1px solid lightgrey;
  cursor: pointer;
`;

const StContentP = styled.p`
  width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const StAuthorDiv = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: space-around;
  gap: 12px;
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
