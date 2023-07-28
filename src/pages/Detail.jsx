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

  const post = data.find((item) => item.id === id);
  return (
    <>
      <Header />
      <Container>
        <div>
          <StContainerH1>{post.title}</StContainerH1>
          <StContentDiv>
            <p>{post.content}</p>
          </StContentDiv>
          <StButtonDiv>
            <Link to={`/edit/${post.id}`}>
              <StEditButton>수정</StEditButton>
            </Link>

            <StDeleteButton
              onClick={() => {
                if (window.confirm("삭제하시겠습니까?")) {
                  dispatch(removeData(post.id));
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
