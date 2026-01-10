import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router";
import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./counterSlice.jsx";
import Counter from "./Counter.jsx";
import Counter2 from "./Counter2.jsx";
import { todoListSlice } from "./TodoList/todoListSlice.jsx";
import ListTodo from "./TodoList/ListTodo.jsx";
import AddTodo from "./TodoList/AddTodo.jsx";
import UpdateTodo from "./TodoList/UpdateTodo.jsx";



// INGAT DECREMENT DNA INCREMENT ITU ARTINYA ADLAH ACTION

const store = configureStore({
  reducer: {
    // nama yang key yang diisni itu akna kita ambil nanti di Counter.jsx
    // state => state.counter

    // jadi nanit ini tuh akan menjadi sebuat state
    counter: counterSlice.reducer, // ini reducer dari file counterSlice
    // inget reducer ini yang ada di counerSlice adalah fungsi besar yang menccakup seluruh actionnya

    // disini ktia registrasikan si todo
    // inga ini harus samaaaaa
    //  name:'todoList',
    // initialState:[],
    // reducers:{

    todoList:todoListSlice.reducer
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/counter" element={<Counter />}></Route>
          <Route
            path="/counter-2"
            element={
              <>
                {/* nahd isini kita cek kan kalo di sebelumya itu kalo ada dua komponen itu pasti beda ya statenya
                tapi sekarag kita coba dengan dua komponen yang berbeda, tapi statenya sama karena dari global state
                store, apakah akan tetap sama si statenya
                
                
                dan trenyata sma, karena ini tuh berdasarkan state yang ari state global store */}
                <Counter2 />
                <Counter2 />
              </>
            }
          ></Route>
          <Route path="/todoList" element={<ListTodo></ListTodo>}></Route>
          <Route path="/todoList/add" element={<AddTodo></AddTodo>}></Route>
          <Route path="/todoList/:id/edit" element={<UpdateTodo></UpdateTodo>}></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

// jdai disini itu ktia perlu bungkus dulu aplkasi kita denagan Provider dan wajib mempunyai
// parameter yaitu store, tempat kita menaruh statenya

// 1.
// Store merupakan tempat dimana data State disimpan
// Saat menggunakan Redux, kita perlu membuat Store terlebih dahulu
// Nanti data State yang kita buat, akan kita masukkan kedalam Store tersebut
// Untuk membuat Store, kita bisa menngunakan  function configureStore()
// dan parameter utamanya itu yang pertama adalah reducernya
// https://redux-toolkit.js.org/api/configre

// 2.
// Setelah kita membuat Store, kita bisa mulai membuat State di Store
// Namun integrasi antara Store dan State itu dilakukan via Reducer
// Redux menggunakan konsep Slice yang merupakan kombinasi dari State dan
// Reducer
// Untuk membuat Slice, kita bisa menggunakan function createSlice()
// https://redux-toolkit.js.org/api/createSlice
// Saat kita membuat State, kita perlu tentukan initial value (nilai awal nya)

// dan secara default state yang ada di store ini,
// jadi state yang ada di redux ini pasti terintegrasi dengna reducer, jadi ketika kita ingin mengubah statenya
// kita harus mengubahnya via reducernya
