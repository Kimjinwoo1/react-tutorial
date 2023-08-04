import axios from "axios"



// 조회
const getMemo = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/memo`)
    // console.log('response=>', response.data)
    return response.data
}

const addMemo = async (newMemo) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/memo`, newMemo)
}

const deleteMemo = async (id) => {
    // id는 url 주소값에 id를 식별하기위해서 
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/memo/${id}`)
}

const editMemo = async (id, updateMemo) => {
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/memo/${id}`, updateMemo)
}

export { getMemo, addMemo, deleteMemo, editMemo }  