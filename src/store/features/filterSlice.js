import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedCategory: "All"
};

export const filterSlice = createSlice({
    name: "filterSlice",
    initialState,
    reducers: {
        setCategory(state, action) {
          state.selectedCategory = action.payload;
        }
      }
});

export const filterReducer = filterSlice.reducer;
export const { setCategory } = filterSlice.actions;