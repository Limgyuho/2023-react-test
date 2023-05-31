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

import { produce } from "immer";

const todosAtom = atom({
  key: "app/todosAtom",
  default: [
    { id: 3, regDate: "2020-12-12 12:12:12", content: "명상" },
    { id: 2, regDate: "2020-12-12 12:12:11", content: "공부" },
    { id: 1, regDate: "2020-12-12 12:12:10", content: "운동" }
  ]
});

function useTodosStatus() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const lastTodoIdRef = useRef(todos.length == 0 ? 0 : todos[0].id);

  const addTodo = (content) => {
    const id = ++lastTodoIdRef.current;
    const regDate = "2022-12-12 12:12:12";

    const newTodo = {
      id,
      regDate,
      content
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

  const removeTodoById = (id) => {
    const index = findIndexById(id);

    if (index == -1) return;

    const newTodos = todos.filter((_, _index) => index != _index);
    setTodos(newTodos);
  };

  const modifyTodoById = (id, content) => {
    const index = findIndexById(id);

    if (index == -1) return;

    const newTodos = produce(todos, (draft) => {
      draft[index].content = content;
    });
    setTodos(newTodos);
  };
  return {
    todos,
    addTodo,
    removeTodoById,
    modifyTodoById,
    findTodoById
  };
}

function TodoListItem({ todo }) {
  const todosStatus = useTodosStatus();

  return (
    <li>
      {todo.id} :{todo.content}
      <NavLink to={`/edit/${todo.id}`}>수정</NavLink>
      <button
        onClick={() =>
          window.confirm(`${todo.id}번 할일을 삭제하시겠습니까?`) &&
          todosStatus.removeTodoById(todo.id)
        }
      >
        삭제
      </button>
    </li>
  );
}

function TodoListPage() {
  const todosStatus = useTodosStatus();

  return (
    <>
      <h1>할일리스트</h1>

      <ul>
        {todosStatus.todos.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </>
  );
}

function TodoWritePage() {
  const todosStatus = useTodosStatus();

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosStatus.addTodo(form.content.value);

    form.content.value = "";
    form.content.focus();
  };

  return (
    <>
      <h1>할일작성</h1>
      <form onSubmit={onSubmit}>
        <input name="content" type="text" placeholder="할일을 입력해주세요." />
        <input type="submit" value="작성" />
      </form>
    </>
  );
}

function TodoEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const todosStatus = useTodosStatus();
  const todo = todosStatus.findTodoById(id);

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if (form.content.value.length == 0) {
      alert("할일을 입력해주세요.");
      form.content.focus();

      return;
    }

    todosStatus.modifyTodoById(todo.id, form.content.value);

    navigate("/list", { repalce: true });
  };

  return (
    <>
      <h1>할일수정</h1>
      <form onSubmit={onSubmit}>
        <input
          name="content"
          type="text"
          defaultValue={todo.content}
          placeholder="할일을 입력해주세요."
        />
        <input type="submit" value="수정" />
        <button type="button" onClick={() => navigate("/list")}>
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
        <Route path="*" element={<Navigate to="/list" />} />
      </Routes>
    </>
  );
}