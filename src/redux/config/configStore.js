import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../modules/memo";




const store = configureStore({
    reducer: {
        dataSlice: dataSlice.reducer,
    }
})

export default store