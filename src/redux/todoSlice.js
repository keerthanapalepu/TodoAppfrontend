 import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
 import { nanoid } from "nanoid";


 export const getTodosAsync = createAsyncThunk(
     "todos/getTodosAsync",
     async() => {
         const response = await fetch('http://localhost:8080/notes');
         if (response.ok) {
             const todos = await response.json();
             return { todos };
         }
     }
 )

 export const addTodosAsync = createAsyncThunk(
     "todos/addTodosAsync",
     async(payload) => {
         const response = await fetch('http://localhost:8080/notes', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({ id: nanoid(), text: payload.title, date: Date.now() })
         });
         if (response.ok) {
             const todos = await response.json();
             return { todos };
         }
     }
 )
 const todoSlice = createSlice({
     name: 'todos',
     initialState: [],
     reducers: {
         addTodo: (state, action) => {
             const newTodo = {
                 id: Date.now(),
                 title: action.payload.title,
                 completed: false,
             }
             state.push(newTodo);
         },
         toggleComplete: (state, action) => {
             const index = state.findIndex(
                 (todo) => todo.id === action.payload.id
             );
             state[index].completed = action.payload.completed;
         },
         DeleteTodo: (state, action) => {
             return state.filter((todo) => todo.id !== action.payload.id);
         }
     },
     extraReducers: {
         [getTodosAsync.fulfilled]: (state, action) => {
             return action.payload.todos;
         },
         [addTodosAsync.fulfilled]: (state, action) => {
             console.log(action.payload.todo);
             return getTodosAsync();
         }
     }
 })

 export const { addTodo, toggleComplete, DeleteTodo } = todoSlice.actions;
 export default todoSlice.reducer;