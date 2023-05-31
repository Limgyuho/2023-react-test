import React, { useRef, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  NavLink,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useRecoilState, atom } from "recoil";

const todosAtom = atom({
  key: "app/todosAtom",
  default: [
    { id: 3, regDate: "2023-12-12 12:12:12", content: "음악감상" },
    { id: 2, regDate: "2023-12-12 12:12:12", content: "공부" },
    { id: 1, regDate: "2023-12-12 12:12:12", content: "운동" },
  ],
});

function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const lastTodoIdRef = useRef(todos[0].id);

  const addTodo = (content) => {
    const id = ++lastTodoIdRef.current;
    const regDate = "2023-12-12 12:12:12";

    const newTodo = {
      id,
      regDate,
      content,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
  };

  const findIndexById = (id) => todos.findIndex((todo) => todo.id == id);

  const findTodoById = (id) => {
    const index = findIndexById(id);

    if (index == -1) return null;

    return todos[index];
  };

  const removeTodyById = (id) => {
    const index = findIndexById(id);

    if (index == -1) return;

    const newTodos = todos.filter((_, _index) => index != _index);
    setTodos(newTodos);
  };

  const modifyTodyById = (id, content) => {
    const index = findIndexById(id);

    if (index == -1) return;

    const newTodos = todos.map((todo, _index) =>
      index == _index ? { ...todo, content } : todo
    );
    setTodos(newTodos);
  };

  return {
    todos,
    addTodo,
    removeTodyById,
    modifyTodyById,
    findTodoById,
  };
}

function TodoListItem({ todo }) {
  const [editMode, setEditMode] = useState(false);
  const todosState = useTodosState();

  return (
    <li>
      {todo.id} : {todo.content}
      <NavLink to={`/edit/${todo.id}`} className="btn btn-sm">
        수정
      </NavLink>
      <button
        className="btn btn-sm"
        onClick={() =>
          window.confirm(`${todo.id}번 할 일을 삭제하시겠습니까?`) &&
          todosState.removeTodyById(todo.id)
        }
      >
        삭제
      </button>
    </li>
  );
}

function TodoListPage() {
  const todosState = useTodosState();

  return (
    <>
      <h1>할 일 리스트</h1>
      <ul>
        {todosState.todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}

function TodoWritePage() {
  const todosState = useTodosState();

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosState.addTodo(form.content.value);

    form.content.value = "";
    form.content.focus();
  };

  return (
    <>
      <h1>할 일 작성</h1>
      <form onSubmit={onSubmit} className="mt-2">
        <input
          type="text"
          name="content"
          placeholder="할 일을 작성해주세요."
          className="input input-bordered w-full max-w-xs"
        />
        <input type="submit" value="작성" className="btn ml-2" />
      </form>
      <div>{todosState.todos.length}</div>
    </>
  );
}

function TodoEditPage() {
  const navigate = useNavigate();
  const todosState = useTodosState();
  const { id } = useParams();
  const todo = todosState.findTodoById(id);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할 일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosState.modifyTodyById(todo.id, form.content.value);

    navigate("/list", { replace: true });
  };

  return (
    <>
      <h1>할 일 수정</h1>
      <form onSubmit={onSubmit}>
        <input
          name="content"
          type="text"
          placeholder="할 일을 입력해주세요."
          defaultValue={todo.content}
          className="input input-bordered"
        />
        <button className="btn btn-sm">수정</button>
        <button className="btn btn-sm" onClick={() => navigate("/list")}>
          취소
        </button>
      </form>
    </>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <header>
        <NavLink
          to="/list"
          style={({ isActive }) => ({ color: isActive ? "red" : null })}
        >
          리스트
        </NavLink>
        &nbsp;/&nbsp;
        <NavLink
          to="/write"
          style={({ isActive }) => ({ color: isActive ? "red" : null })}
        >
          작성
        </NavLink>
        <hr />
        주소 : {location.pathname}
      </header>
      <Routes>
        <Route path="/list" element={<TodoListPage />} />
        <Route path="/write" element={<TodoWritePage />} />
        <Route path="/edit/:id" element={<TodoEditPage />} />
        <Route path="/*" element={<Navigate to="write" />} />
      </Routes>
    </>
  );
}