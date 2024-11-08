"use client";
import React from "react";
import { Form } from "@/components/form";
import { Header } from "@/components/header";
import { TodoHero } from "@/components/todo-hero";
import "./styles.css";
import "./output.css";
import { useTodoStore } from "@/stores";
import { TodoList } from "@/modules/todo-list";

function Home() {
  const todos = useTodoStore((state) => state.todos);

  const todosCompleted = todos.filter((todos) => todos.is_completed === true).length;
  const totalTodos = todos.length;
  return (
    <div className="flex flex-col w-10/12  sm:max-w-full h-screen ">
      <Header />
      <TodoHero todosCompleted={todosCompleted} totalTodos={totalTodos} />
      <Form />
      <TodoList />
    </div>
  );
}
export default Home;
