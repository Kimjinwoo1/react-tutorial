import React from "react";
import Header from "../common/Header";
import Container from "../common/Container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeData } from "../redux/modules/memo";

export default function Detail() {
  const data = useSelector((state) => state.dataSlice);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // 수정사항 아이디값 추출
  const { id } = useParams();
  console.log("id=>", id);
  return (
    <>
      <Header />
      <Container>
        {data
          .filter((event) => event.id === id)
          .map((item) => {
            console.log("datas=>", item);
            return (
              <div key={item.id}>
                <h1
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                >
                  {item.title}
                </h1>
                <div
                  style={{
                    height: "400px",
                    border: "1px solid lightgray",
                    borderRadius: "12px",
                    padding: "12px",
                  }}
                >
                  <p>{item.content}</p>
                </div>
                <div
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Link to={`/edit/${item.id}`}>
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
                      if (window.confirm("삭제하시겠습니까?")) {
                        // setDate(data.filter((event) => event.id !== item.id));
                        dispatch(removeData(item.id));
                        navigate("/");
                      }
                      // setDate(data.filter((event) => event.id !== item.id));
                      // alert("삭제할까?");
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
            );
          })}
      </Container>
    </>
  );
}
