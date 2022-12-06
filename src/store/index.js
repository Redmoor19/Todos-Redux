import { configureStore } from "@reduxjs/toolkit";
import todos from "../features/todoList/todosSlice";
import filters from '../features/filters/filtersSlice';

const store = configureStore({
    reducer: {todos, filters},
    devTools: process.env.NODE_ENV !== "production" ? true : false
});

export default store;