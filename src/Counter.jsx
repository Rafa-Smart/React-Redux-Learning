// 1. mneggunakan state
// Untuk menggunakan State yang ada di Store, kita bisa menggunakan function
// useSelector()
// https://react-redux.js.org/api/hooks#useselector
// Kita bisa tentukan State mana yang akan kita gunakan dengan menyebutkan
// nama state nya yang sama dengan nama di Slice

import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./counterSlice";

export default function Counter() {
  // this selector will return a new object reference whenever called,
  // which causes the component to rerender after *every* action is dispatched

  //   jadi bisa juga seeprti ini
  // karena seluruh state itu akna di masukan kedalam objek state
  // const { count, user } = useSelector((state) => ({
  //   count: state.count,
  //   user: state.user,
  // }))

  const counter = useSelector((state) => {
    return state.counter;
    // counter nya ini adalah nama yang kita setorkan di store yang ada di main.jsx
  });

  //   disini ktia kan menggunakan dispatch
  // 1.
  // Setelah kita membuat Action menggunakan Reducer, selanjutnya kita bisa
  // memanggil Action tersebut menggunakan dispatch, sama seperti Reducer
  // biasanya
  // Untuk membuat Dispatch, kita bisa menggunakan useDispatch() function
  // https://react-redux.js.org/api/hooks#usedispatch
  // Selanjutnya kita bisa gunakan Action yang sebelumnya sudah kita buat untuk
  // menentukan Reducer mana yang akan kita panggil

  // 2.
  // jadi berlu di ingat ya kalo misalakn useSelector itu dia sudah menggunakan memoixzation
  // jadi kalo misalakna statenya tidak berubah, maka dia aknemnggunakan state yang itu
  // tapi jika berubah maa dia akan beriakn lagi nilai state yang baruya
  // Ini penting, karena selector yang mengembalikan referensi hasil yang berbeda ketika dipanggil
  //  lagi dengan input yang sama akan menyebabkan rendering ulang yang tidak perlu .

  const dispatch = useDispatch(); // ini akna berisi seluruh dispacth dari si storenya

  function handleAddClick(e) {
    dispatch(increment());
    // nah ingat pas dia manggil ini dia itu lansung manggil fungsi besar reducer dan membawa obje
    // {"type":"counter/increment"}
    // nah increment ini didalpat dari action yang sidah ita export di couterSlice sebelumnya
  }

  function handleMinClick(e) {
    if (counter >= 1) {
      dispatch(decrement());
    }else{
        alert('ga bisa di kurang lagi')
    }
  }




  // disini kalo ktia coba ubah state dari counternya
  // misal counter++
  // maka bisa aja dna engga error tapi, bestpracticenya itu kia harus ubah via reducer
  // jadi emnggunakan action, yaitu kompbinasi dengan reducer
  // jadi biasa aja ubah disini karena ini tuh kaya variable aja

  // 1.
  // Saat kita menggunakan State Management di React, kita diberi function untuk
  // mengubah State nya
  // Sedangkan di Redux, hal itu tidak ada
  // Kita tidak diberi function untuk mengubah nilai di State
  // Lantas bagaimana jika kita ingin mengubah data di State?
  // Maka kita harus menggunakan Action, yang akan kita bahas di materi selanjutnya

  // 2.
  // Action di Redux sebenarnya adalah Reducer, namun cara membuatnya lebih
  // mudah
  // Kita bisa membuat Action dengan cara membuat semua function Reducer di Slice
  // Secara otomatis nanti kita bisa menggunakan nama function Reducer sebagai
  // Action di Redux
  // Seperti yang kita tahu, bahwa React menyarankan bahwa kita harus membuat
  // data Immutable di State
  // Di materi React Dasar kita sudah belajar tentang Immer Library untuk
  // mempermudah
  // Saat kita menggunakan Redux, secara otomatis Redux menggunakan Immer
  // Library ketika menggunakan Reducer
  // Dengan begitu, kita tidak perlu lagi melakukan copy data lagi secara manual,
  // karena hal itu sudah dilakukan otomatis oleh Immer Library`

  // jadi dari counterSlice yang sudah kit registrasikan ke store di main
  // kita akan ambil state counternya

  // 3.
  // Setelah kita membuat Action menggunakan Reducer, selanjutnya kita bisa
  // memanggil Action tersebut menggunakan dispatch, sama seperti Reducer
  // biasanya
  // Untuk membuat Dispatch, kita bisa menggunakan useDispatch() function
  // https://react-redux.js.org/api/hooks#usedispatch
  // Selanjutnya kita bisa gunakan Action yang sebelumnya sudah kita buat untuk
  // menentukan Reducer mana yang akan kita panggil

  return (
    <div>
      <h1>Counter: {counter}</h1>
      <button onClick={handleAddClick}>Add</button>
      <button onClick={handleMinClick}>Min</button>
    </div>
  );
}


// test