import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
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
]

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        // 추가하기 reducers
        addData: (state, action) => {
            state.push(action.payload)
        },
        // 삭제하기 reducers
        removeData: (state, action) => {
            return state.filter((item) => item.id !== action.payload)
        },
        // 수정하기 reducers
        editData: (state, action) => {
            // 변경되어야될 것들 구조분해할당
            const { id, title, content } = action.payload
            // state에서 id와 일치하는것 찾기
            const prevData = state.find((item) => item.id === id)
            // 수정하기 클릭시 prevData가 있으면 아래 로직 실행
            if (prevData) {
                prevData.title = title;
                prevData.content = content;
            }

        }
    }
})

export const { addData, removeData, editData } = dataSlice.actions;
export default dataSlice