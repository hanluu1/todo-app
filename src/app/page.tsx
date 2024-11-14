'use client';

import './styles.css';
import './output.css';

import React from 'react';

import { Form, Header } from '@/components/layout';
import { TodoHero } from '@/modules/home';
import { TodoListCols } from '@/modules/todo-list';
import { useTodoStore } from '@/stores';

function Home() {
  const todos = useTodoStore((state) => state.todos);

  const todosCompleted = todos.filter((todos) => todos.is_completed === true).length;
  const totalTodos = todos.length;
  return (
    <div className="flex h-screen w-10/12  flex-col sm:max-w-full ">
      <Header />
      <TodoHero todosCompleted={todosCompleted} totalTodos={totalTodos} />
      <Form />
      <TodoListCols />
    </div>
  );
}
export default Home;
