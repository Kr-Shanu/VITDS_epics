import { createSlice } from "@reduxjs/toolkit";

const threatSlice = createSlice({

    name: "threat",
    initialState: 0,
    reducers: {
        alterVal: (state, action) => {
            switch(action.type) {
                case "INCREMENT" : return state+1;
                case "DECREMENT" : return state-1;
                default: return state;
            }
        }
    }
})


export default threatSlice.reducer;