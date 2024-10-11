"use client";
import React, {useState} from "react";
import Form from "@/components/Form";
import Header from "@/components/Header";
import TODOHero from "@/components/TODOHero";
import TODOList from "@/components/TODOList";
import "./styles.css"

function Home() {
  const [todos, setTodos] = useState([]);
  const todos_completed = todos.filter(
    (todos) => todos.is_completed === true
  ).length;
  const total_todos = todos.length;
  return (
    <div className="wrapper">
      <Header  />
      <TODOHero  todos_completed={todos_completed} total_todos={total_todos} />
      <Form setTodos={setTodos}/>
      
      <TODOList todos={todos}/>
        
      
    </div>
  );
}
export default Home;