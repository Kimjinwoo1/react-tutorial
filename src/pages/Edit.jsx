import React, { Fragment, useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { editData } from "../redux/modules/memo";

export default function Edit() {
  const data = useSelector((state) => state.dataSlice);

  const dispatch = useDispatch();

  const { id } = useParams();
  // console.log("id =>", id);
  // 추가사항

  const findItem = data.find((item) => item.id === id);
  // console.log("item=>", findItem);

  // 없으면 문자열로한다 아님 옵셔널체이닝을 걸어준다.
  const [editTitle, editSetTitle] = useState(findItem?.title);
  const [editContent, editSetContent] = useState(findItem?.content);

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("제출!");

    const newData = {
      id: id,
      title: editTitle,
      content: editContent,
    };

    // const editIndex = data.findIndex((item) => item.id === newData.id);

    // console.log("edit=>", edit);

    //findIndex 함수에서 요소가 없으면 -1 을 반환한다.
    // if (editIndex !== -1) {
    // 데이터 배열의 복사본을 만든다.
    // const updatedData = [...data];
    // 콘솔은 찍어본 결과 수정하기 누르고 홈으로 가면 가지고있는 정보가 다나옴
    // console.log("updatedData=>", updatedData);
    // 새로운 걸로 교체 한다.
    // updatedData[editIndex] = newData;
    // console.log("updatedData[editIndex]=>", updatedData[editIndex]);
    // 이 값을 넣으니깐 data.map is not a function 오류가뜬다 물어보자.
    // setDate(updatedData);
    dispatch(editData(newData));
    // updatedData콘솔로찍어봐라
    // }

    // console.log("data[edit]=>", data[edit]);
    // setDate([
    //   ...data,
    //   {
    //     id,
    //     content: data[edit].editContent,
    //     title: data[edit].editTitle,
    //   },
    // ]);
    navigate("/");
  };

  return (
    <Fragment>
      <Header />
      <Container>
        {/* {data.filter((item) => item.id == +id)} */}
        <form
          style={{
            height: "600px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
          }}
          onSubmit={submitHandler}
        >
          <div>
            <input
              placeholder="제목"
              value={editTitle}
              onChange={(e) => {
                editSetTitle(e.target.value);
              }}
              style={{
                width: "100%",
                height: "60px",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "8px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <div
            style={{
              height: "400px",
            }}
          >
            <textarea
              placeholder="내용"
              value={editContent}
              onChange={(e) => {
                editSetContent(e.target.value);
              }}
              style={{
                resize: "none",
                height: "100%",
                width: "100%",
                fontSize: "18px",
                borderRadius: "12px",
                border: "1px solid lightgrey",
                padding: "12px",
                boxSizing: "border-box",
              }}
            />
          </div>
          <button
            onClick={submitHandler}
            style={{
              width: "100%",
              height: "40px",
              border: "none",
              color: "white",
              borderRadius: "12px",
              backgroundColor: "orange",
              cursor: "pointer",
            }}
          >
            수정하기
          </button>
        </form>
      </Container>
    </Fragment>
  );
}
