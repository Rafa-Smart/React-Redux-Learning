import { createSlice } from "@reduxjs/toolkit";

// jadi tiap kali mau ngebuat state, kita harus buat dulu pake slice ini
// .
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
//

export const counterSlice = createSlice({
  name: "counter", // jdi ini tuh namanya, dan harus saa ya best practicenya kalo couterSlice berati counter
  initialState: 0, // ini inisiasi awal dari statenya
  reducers: {
    // jadi yang didalam sini itu adaalh action
    // jadi disnin itu ada function untuk reducernya / mengubah statenya
    // yang dimana paramaternya itu adalah si statenya dan akna mengembalikan statenyayag baru
    increment: (state) => {
      // jadi ini kita akn mereturnkan dat barunya
      return state + 1;
    },
    decrement: (state) => {
      return state - 1;
    },

    // sekarang kita buat action bar yang menerima parameter
    increment2: (state, action) => {
      // dan objek action ini ada atribut yaitu action.type => nama_state/nama_action => counter/increment2
      // dan atribu action.payload

      // nah jadi parameter yang dikrimkan oleh si dispact akan masuk kedalam
      // action.payload
      // ini tuh bisa apa aja, misal objek, array, dll
      // JADI KALO MISALKAN MAU MASUKAN BANYAK data parameter
      // maka harus di masuakn dulu ke objek, jdai nanti action.payload.objek.namaatribut
      if (action.payload) {
        return state + action.payload;
      } else {
        return state + 1;
      }
    },

    decrement2: (state, action) => {
      if (action.payload) {
        return state - action.payload;
      } else {
        return state - 1;
      }
    },
  },

  // disini kita akn membuat selector untuk di Counter2
  selectors: {
    // nah jadi dia itu akan mendapatkan statenya, tpi ketiak ktia ambil kita akn kalikan 3, ingat
    // ini bukan ubah data state, tapi ini tuh hanya ngambil dat alalu di kali 3, jadi data state yag asli
    // tidak di kali 3
    getTripleCounter: (state) => {
      return state * 3;
    },
    getStateMultipleFive(state) {
      return state * 5;
    },
    getMultipleAny(state, value){
        // nah ini tuh hanya dapat satu parameter aja ya
        // jadi kalo mau ngirm banyak maka masukan ke dalam objek jadi nanti value.atribut1, dll
        return state * value
    }
  },
});

// nh disni kita export fungsinya ini dari si counterSlice.actionsnya
// jdai kita destructuring dari si counterSlice.actionsnya

// besok tanya ketnapa kitaa kan mau akses fungsi yang aada didalam objek reducer, kenapa harus pake actions

// ini harus di baca selalu 
// https://chatgpt.com/c/694761cc-083c-8320-9030-836eca48aace
// itu penjelasanya lengkap


export const { increment, decrement, increment2, decrement2 } =
  counterSlice.actions;



//   nah disnin jangan lpa kita export si selectornya
export const {getStateMultipleFive, getTripleCounter,getMultipleAny} = counterSlice.selectors;

// nah kemudian di main.jsx, kita registrasikan reducernya dari slice yang kita buat ini
// const store = configureStore({
//   reducer:{
//     counter:counterSlice.reducer // ini reducer dari file counterSlice
//   }
// })

// 2. mneggunakan state
// Untuk menggunakan State yang ada di Store, kita bisa menggunakan function
// useSelector()
// https://react-redux.js.org/api/hooks#useselector
// Kita bisa tentukan State mana yang akan kita gunakan dengan menyebutkan
// nama state nya yang sama dengan nama di Slice

// https://chatgpt.com/c/694761cc-083c-8320-9030-836eca48aace
// itu penjelasanya lengkap
// counterSlice = {
//   name: 'counter',

//   reducer: function rootReducer(state = 0, action) {
//     switch (action.type) {
//       case 'counter/increment':
//         return state + 1
//       case 'counter/decrement':
//         return state - 1
//       default:
//         return state
//     }
//   },

//   actions: {
//     increment: () => ({ type: 'counter/increment' }),
//     decrement: () => ({ type: 'counter/decrement' })
//   },

//   caseReducers: {
//     increment: (state) => state + 1,
//     decrement: (state) => state - 1
//   }
// }


// jadi ketika kita panggil si action increment
// maka dia akna langusng memanggil si fungis besar atau ungis utama si reducernya
// dengan membawa objek {"type":"counter/increment"}
// dan di fungsi utama si reducernya dia cek si typenya
// lalu ternyata cocok ke increment, maka lasung ia jalankan logikanya

// 3.
// Setelah kita membuat Action menggunakan Reducer, selanjutnya kita bisa
// memanggil Action tersebut menggunakan dispatch, sama seperti Reducer
// biasanya
// Untuk membuat Dispatch, kita bisa menggunakan useDispatch() function
// https://react-redux.js.org/api/hooks#usedispatch
// Selanjutnya kita bisa gunakan Action yang sebelumnya sudah kita buat untuk
// menentukan Reducer mana yang akan kita panggil

// 4.
// jadi berlu di ingat ya kalo misalakn useSelector itu dia sudah menggunakan memoixzation
// jadi kalo misalakna statenya tidak berubah, maka dia aknemnggunakan state yang itu
// tapi jika berubah maa dia akan beriakn lagi nilai state yang baruya
// Ini penting, karena selector yang mengembalikan referensi hasil yang berbeda ketika dipanggil
//  lagi dengan input yang sama akan menyebabkan rendering ulang yang tidak perlu .

// this selector will return a new object reference whenever called,
// which causes the component to rerender after *every* action is dispatched
// const { count, user } = useSelector((state) => ({
//   count: state.count,
//   user: state.user,
// }))
