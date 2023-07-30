import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeData } from "../redux/modules/memo";
import { styled } from "styled-components";

export default function Detail() {
  const data = useSelector((state) => state.dataSlice);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // 수정사항 아이디값 추출
  const { id } = useParams();

  const findData = data.find((item) => item.id === id);
  console.log("findData=>", findData);

  // if (!findData) {
  //   return <div>로딩중입니다.</div>;
  // }
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
            {/* <Link to={`/edit/${findData?.id}`}> */}
            <StEditButton
              onClick={() => {
                navigate("/edit", {
                  state: {
                    findData,
                  },
                });
              }}
            >
              수정
            </StEditButton>
            {/* </Link> */}

            <StDeleteButton
              onClick={() => {
                if (window.confirm("삭제하시겠습니까?")) {
                  dispatch(removeData(findData?.id));
                  navigate("/");
                }
              }}
            >
              삭제
            </StDeleteButton>
          </StButtonDiv>
        </div>
        {/* //   );
          // }
          // )} */}
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
