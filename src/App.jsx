import { useEffect, useState } from "react";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    
    if(!value.trim()) return alert("Todo kiriting")

    let oldTodos = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];

    const newTodo = {
      id: Date.now(),
      text: value,
    };
    localStorage.setItem("todo", JSON.stringify([...oldTodos, newTodo]));
    setLoading(!loading);
    setValue("")
  };

  useEffect(() => {
    let todos = localStorage.getItem("todo")
      ? JSON.parse(localStorage.getItem("todo"))
      : [];
    setTodos(todos);
  }, [loading]);

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    localStorage.setItem("todo", JSON.stringify(newTodos))
    setLoading(!loading)
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler} style={{ width: 500, margin: "0 auto" }}>
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          type="text"
          placeholder="todo"
        />
        <button>create</button>
      </form>

      <hr />

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo.text} <button onClick={() => deleteTodo(todo.id)}>delete</button></li>
        ))}
      </ul>
    </div>
  );
}

export default App;
