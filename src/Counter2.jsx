import { useDispatch, useSelector } from "react-redux";
import {
  decrement2,
  getMultipleAny,
  getStateMultipleFive,
  getTripleCounter,
  increment2,
} from "./counterSlice";

export default function Counter2() {
  //     Pada beberapa kasus, mungkin kita ingin mengirimkan parameter di Action
  // Semua parameter yang kita kirim di Action, secara otomatis dia akan disimpan di
  // attribute payload di parameter ke 2 di Reducer
  // Misal ketika kita kirim dispatch(increment(2)), maka di reducer akan menerima
  // (state, action), dimana action akan berisi type : "counter/increment", dan action : 2
  // Kita bisa menggunakan tipe data apapun pada payload, dari tipe data sederhana
  // seperti number, string, atau tipe data kompleks seperti array, object dan lain-lain

  //   ini selector untuk state aslinya dari si reducernya
  const counter = useSelector((state) => state.counter);

//   ini nanti untuk si actionnya
  const dispatch = useDispatch();

  function handleAddClick(e) {
    dispatch(increment2(2));
  }

  function handleMinClick(e) {
    if (counter >= 1) {
      dispatch(decrement2(2));
    } else {
      alert("ga bisa di kurang lagi");
    }
  }

  //   jadi gini pada sebuat action kita kadnag inign hanya mendapakan data statenya saja
  // kareana kalo kita lihat sebelumnya yaitu action decrement dan increment
  // emmang dia itu endapatkan data, TAPI dia itu sebenrnya hanya memberikan data yang sudha di ubah
  // dan itu adalah data yang berfungsi untuk enganggi data yang ada di statenya
  // jadi bukan di gunakan untuk mendapatkan datanya

  // jadi untuk mendapatkan data state yang lebih detial
  // kita bisa menggunakan selector secara manual

  // dan cara untuk membautnya adalah sama seperi kita ketika ingin membuat action
  // misalkan gini kita kan menambahkan atau emgambil dat astate counter tapi data counter ini ana di kali kan 3
  // nah INGET INI BUKAN MANIPULASI DATA, INI HANYA NGAMBIL LALU DI KALI 3, JADI STATENYA ITU TETP YANG SEBELUM DI KALI
  // 3 INI

  //   ini selector manual
  const counterfive = useSelector(getStateMultipleFive);
  // nah ini itu akan otomatis menjadi state dan ketika state yang asli berubah, maka state yang ini juga akn berubah
  // karena ini itu ebrdasarka state yang asli
  const counterTrple = useSelector(getTripleCounter);

  //   jadi meskipun kita itu ubahnya di incement dan decrement, tapi si counterfive dan counterTriple ini juga kan berubah
  // kerna dia itu berdasarkna state yang asli

  //   nah sekarnag gimana kao kita ingin emnambahkan parameter, kan kalo action itu bisa ya
  // apakah selectro ini bisa, jawabannya itu iya bisa
  //   tapi engga kaya action yang pake action.payload, acton.ytpe
  // jadi ini tuh lansung aja value, jadi kalo mau ngirim banyak, maka kirim aja objek


//   nah cara menggunaknaya itu agak sedikit berbeda
// karena ini tuh kan butuh 2 parameter ya, jadi kalo satu mah stateya engga perlu di deklarasiin lagi
// tapi kalo pake parameter kita perlu untuk deklarasiin dulu si statenya jadi gini

// karena emang di selectrosnya itu kita punya 2 parameter yaitu state dan value, adi kita harus begini
  const counterAny = useSelector(state => {
    return getMultipleAny(state, 10);
  });

//   jadi simplenya itu action di gunakan untuk memanipulasi data di statenya
// dan selector itu di gunakan untuk mendaatkan data statenya

  return (
    <div>
      <h1>asli Counter: {counter}</h1>
      <h1>hasil selector Counter kali 5: {counterfive}</h1>
      <h1>hasil selector Counter kali 3: {counterTrple}</h1>
      <h1>hasil selector Counter kali any(10): {counterAny}</h1>
      <button onClick={handleAddClick}>Add 2</button>
      <button onClick={handleMinClick}>Min 2</button>
    </div>
  );
}
