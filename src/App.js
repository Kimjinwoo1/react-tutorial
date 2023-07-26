import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Detail from "./pages/Detail";
import Create from "./pages/Create";
import Edit from './pages/Edit';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {
  const [data, setDate] = useState([
    {
      id: nanoid(),
      title: "제목입니다1",
      content: "내용입니다1",
      author: "작성자 입니다.1",
    },
    {
      id: nanoid(),
      title: "제목입니다2",
      content: "내용입니다2",
      author: "작성자 입니다.2",
    },
    {
      id: nanoid(),
      title: "제목입니다3",
      content: "내용입니다3",
      author: "작성자 입니다.3",
    },
  ]);

  return (
    // 페이지 이동에 사용되는 Route 태그를 위해선 Routes로 먼저 감싸야 한다.
    <Routes>
      {/* path="/"이기 때문에 '<주소>/'인 주소로 접속할 경우 Main 컴포넌트가 화면에 보여지게 된다.  */}
      <Route path="/" element={<Main data={data} setDate={setDate} />} />
      <Route path="/detail/:id" element={<Detail data={data} setDate={setDate} />} />
      <Route path="/create" element={<Create data={data} setDate={setDate} />} />
      {/* 수정하기 넘어가도 원래 가지고있던 제목이나 내용도 같이가져가기위하여*/}
      <Route path="/edit/:id" element={<Edit data={data} setDate={setDate} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
