import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { removeData } from "../redux/modules/memo";
import { styled } from "styled-components";

export default function Main() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const findData = useSelector((state) => state.dataSlice);

  return (
    <>
      <Header />
      <Container>
        <StContainerDiv>
          <StContainerButton
            onClick={() => {
              navigate("/create");
            }}
          >
            추가
          </StContainerButton>
        </StContainerDiv>
        {/* 초기값 형성해 놓은 걸 map 함수로 화면에뿌리기 */}
        {findData.map((findData) => {
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
                <div>{findData.author}</div>
                <div>
                  {/* <Link to={`/edit/${data.id}`}> */}
                  <StEditButton
                    onClick={() => {
                      navigate("/edit", {
                        state: {
                          findData,
                        },
                      });
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
                  {/* </Link> */}

                  <StDeleteButton
                    onClick={() => {
                      if (window.confirm("삭제하시겠습니까?")) {
                        dispatch(removeData(findData.id));
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
