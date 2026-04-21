import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { reviewsApi } from "../../api/api";

export const getReviews = createAsyncThunk(
    "getReviews",
    async function (info = null, { dispatch, rejectWithValue }) {
        try {
            const response = await fetch(reviewsApi);
            if (response.status === 200) {
                const records = await response.json();
                return records;
            }
            else {
                throw Error(`Error: ${response.status}`);
            }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
        finally {

        }
    }
)

export const createReview = createAsyncThunk(
    "createReview",
    async function (record = null, { dispatch, rejectWithValue }) {
        try {
            const res = await fetch(reviewsApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            });
            if (res.status === 201) {
                return 'Вы успешно оставили отзыв'
            }
            else {
                throw Error(`Error: ${res.status}`);
            }

        } catch (error) {
            return rejectWithValue(error.message);
        }

    }
)

export const deleteReview = createAsyncThunk(
    'deleteReview',
    async (mockupId) => {
        try {
            const response = await fetch(`${reviewsApi}/${mockupId}`, {
                method: 'DELETE'
            });
            if (response.status === 200) {
                return "Успешно удалено";
            } else {
                throw Error(`Error: ${response.status}`);
            }
        } catch (error) {
            // eslint-disable-next-line no-undef
            return rejectWithValue(error.message);
        }

    }
);

const recordsSlice = createSlice({
    name: 'reviewsSlice',
    initialState: {
        reviews: [],
        loading: false,
        delLoading: false,
        delMessage: null,
        delError: null,
        error: null,
        success: null
    },
    extraReducers: builder => {
        builder.addCase(getReviews.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        })
        builder.addCase(getReviews.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
        builder.addCase(getReviews.pending, (state, action) => {
            state.loading = true;
        })
        // post
        builder.addCase(createReview.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload;
            toast.success("Отзыв успешно добавлен");
        })
        builder.addCase(createReview.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(createReview.pending, (state, action) => {
            state.loading = true;
        })
        // delete
        builder.addCase(deleteReview.pending, (state, action) => {
            state.delLoading = true;
        })
        builder.addCase(deleteReview.fulfilled, (state, action) => {
            state.delLoading = false;
            state.delMessage = action.payload
            state.reviews = state.reviews.filter((item) => item.id !== action.meta.arg);
            toast.success("Успешно удалено");
        })
        builder.addCase(deleteReview.rejected, (state, action) => {
            if (action.payload === undefined) state.delError = 'Ошибка, что то пошло не так'
            else state.delError = action.error
            state.delLoading = false;
        })
    }
})

export default recordsSlice.reducer