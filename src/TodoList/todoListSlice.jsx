import { createSlice } from "@reduxjs/toolkit";
let id = 0;
export const todoListSlice = createSlice({

    // jadi nanti itu akna ada array ayng isinya adlah objek
    name:'todoList',
    initialState:[],
    reducers:{

        // jadi ingat ya yang ada di sini itu datanya sudha menggunakan immer
        // jadi ktia tidak perlu lagi membuat state baru, jadi tinggal uabh saja / manipulasi saja
        addTodo: (state, action) => {
            const name = action.payload
            state.push({name:name, id:id++})
        },
        deleteTodo: (state, action) => {
            // jadi kalo finIndex ini akna mengembalikan index
            // kalo find akna mengembalikan objek
            const id = state.findIndex((data) => {
                return data.id == action.payload.id
            })
            state.splice(id,1);
        },
        updateTodo: (state, action) => {
            const {name, id} = action.payload;
            const todo = state.find(data => {
                return data.id == id;
            })
            todo.name = name
        }
    },


    // sekarang kita kan membuat selector untuk mendapatkan todoketika nanti ktia ingin edit
    selectors: {
        getTodo: (state, id) => {
            return state.find(todo => todo.id == id)
        }
    }
})

export const {addTodo, deleteTodo, updateTodo} = todoListSlice.actions;
export const {getTodo} = todoListSlice.selectors;
