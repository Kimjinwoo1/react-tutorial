import React, { Fragment, useEffect, useState } from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { useNavigate, useParams } from "react-router-dom";

export default function Edit({
  data,
  setDate,
  title,
  setTitle,
  contents,
  setContents,
}) {
  const { id } = useParams();
  // console.log("id=>", id);

  // const { data, setDate } = props;
  // const { title, contents } = data;

  // const [title, setTitle] = useState("");
  // const [contents, setContests] = useState("");

  // 추가사항

  const findItem = data.find((item) => item.id === +id);
  // console.log("item=>", findItem);

  const [editTitle, editSetTitle] = useState(findItem.title);
  const [editContent, editSetContent] = useState(findItem.content);

  const navigate = useNavigate();

  // setTitle(data.title);
  // setContest(data.content);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("제출!");
    const newData = {
      id: +id,
      title: editTitle,
      content: editContent,
    };
    // setDate([...data, newData]);
    const editIndex = data.findIndex((item) => item.id === newData.id);
    // console.log("edit=>", edit);
    if (editIndex !== -1) {
      const updatedData = [...data];
      updatedData[editIndex] = newData;
      setDate(updatedData);
    }

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
