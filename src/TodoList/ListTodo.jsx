import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router";
import { deleteTodo } from "./todoListSlice";
import { useMemo, useState } from "react";

export default function ListTodo() {
  const dispacth = useDispatch();
  // disini ktia ambil data statenya
  const todos = useSelector((state) => state.todoList);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();


  // sebenernya ini itu engga usah, karena ktia lansung ubah melalui onChange, dan si useMemo ini kna dia kan di triggger sesuai perubahan state pada dependenciesnya
  function handlesearchClick(e) {
    if (search) {
      navigate({
        pathname: "/todoList",
        search: `/${search}`,
      });
    }else {
        navigate({
            pathname:"/todoList"
        })
        setSearch('')
    }
  }

  const datas = useMemo(() => {
    return todos.filter((data) => {
        return data.name.includes(search)
    })
  }, [todos, search])

  // disini ktia pake memo

  return (
    <div>
      <h1>List todo</h1>
      <Link to={"/todoList/add"}>Add Todo</Link>
      <hr></hr>
      <div>
        <input
          type="text"
          placeholder="search...."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
        <button onClick={handlesearchClick}>search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {datas.map((todo, index) => (
            <tr key={index}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td>
                <Link to={`/todoList/${todo.id}/edit`}>Update</Link>
                <button onClick={(e) => dispacth(deleteTodo({ id: todo.id }))}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
