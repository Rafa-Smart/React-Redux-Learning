import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getTodo, updateTodo } from "./todoListSlice";

export default function UpdateTodo() {
  // disini kita akan ambil data parameter idnya
  // karna nanti ketika di klik edit, maka nanti dia akn ke path edit ini berserta idnya
  // lalu nanti id ini akna kita gunakan untuk mengambil data idnya pake selector
  // getTodo
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // disini ktia pake cara ini karena kita menggunakan parameter
  const todo = useSelector((state) => {
    console.log(params.id);

    return getTodo(state, params.id);
  });
  const [name, setName] = useState(todo?.name || "");

  function handleChangeClick(e) {
    dispatch(updateTodo({ name: name, id: params.id }));
    navigate("/todoList");
  }

  return (
    <div>
      <h1>Edit Todo</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button onClick={handleChangeClick}>save</button>
    </div>
  );
}
