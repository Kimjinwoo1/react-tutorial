import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../common/Header";
import Container from "../common/Container";
import { useDispatch, useSelector } from "react-redux";
import { removeData } from "../redux/modules/memo";

export default function Main() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.dataSlice);
  console.log("data=>", data);

  return (
    <>
      <Header />
      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "12px",
          }}
        >
          <button
            onClick={() => {
              navigate("/create");
            }}
            style={{
              border: "none",
              padding: "8px",
              borderRadius: "6px",
              backgroundColor: "skyblue",
              color: "white",
              cursor: "pointer",
            }}
          >
            추가
          </button>
        </div>
        {/* 초기값 형성해 놓은 걸 map 함수로 화면에뿌리기 */}
        {data
          // .filter((item) => id === item.id)
          .map((datas) => {
            return (
              <div
                key={datas.id}
                style={{
                  backgroundColor: "#EEEEEE",
                  height: "100px",
                  borderRadius: "24px",
                  marginBottom: "12px",
                  display: "flex",
                  padding: "12px 16px 12px 16px",
                }}
              >
                <div
                  onClick={() => {
                    navigate(`/detail/${datas.id}`);
                  }}
                  style={{
                    flex: 4,
                    borderRight: "1px solid lightgrey",
                    cursor: "pointer",
                  }}
                >
                  <h2>{datas.title}</h2>
                  <p
                    tyle={{
                      width: "300px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {datas.content}
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "end",
                    justifyContent: "space-around",
                    gap: "12px",
                  }}
                >
                  <div>{datas.author}</div>
                  <div>
                    <Link to={`/edit/${datas.id}`}>
                      <button
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
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        // alert("삭제하시겠습니까?");

                        if (window.confirm("삭제하시겠습니까?")) {
                          // setDate(
                          //   data.filter((event) => event.id !== datas.id)
                          dispatch(removeData(datas.id));
                          // );
                        }
                      }}
                      style={{
                        border: "none",
                        padding: "8px",
                        borderRadius: "6px",
                        backgroundColor: "red",
                        color: "white",
                        cursor: "pointer",
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </Container>
    </>
  );
}
