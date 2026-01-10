import { useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addTodo } from "./todoListSlice";

export default function AddTodo(){
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    function handleAddTodo(e){
        dispatch(addTodo(name));
        // lalu ketika sudah di tambah ktia akan redirect ke halaman /todolist
        navigate('/todoList')
    }

    return (
        <div>
            <h1>Add Todo</h1>
            <input type="text" value={name} placeholder="enter todo name" onChange={(e) => setName(e.target.value)}></input>
            <button onClick={handleAddTodo}>Add</button>
        </div>
    )
}