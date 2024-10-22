"use client";
import React, { useState } from "react";
import Form from "@/components/Form";
import Header from "@/components/Header";
import TODOHero from "@/components/TODOHero";
import { TodoList } from "@/components/todo-list";
import "./styles.css";
import "./output.css";

function Home() {
  const [todos, setTodos] = useState([]);
  const todos_completed = todos.filter((todos) => todos.is_completed === true).length;
  const total_todos = todos.length;
  return (
    <div className="flex flex-col w-2/3">
      <Header />
      <TODOHero todos_completed={todos_completed} total_todos={total_todos} />
      <Form setTodos={setTodos} />

      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}
export default Home;
