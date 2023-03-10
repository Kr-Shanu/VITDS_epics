import { configureStore } from "@reduxjs/toolkit";
import threatReducer from "./slices/threatSlice"

export const store = configureStore({
    reducer: {
        threat: threatReducer
    }   
});

