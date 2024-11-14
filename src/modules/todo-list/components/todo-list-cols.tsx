'use client';

import React from 'react';

import { useTodoStore } from '@/stores';

import { TodoList } from './todo-list';

export function TodoListCols() {
  const todos = useTodoStore((state) => state.todos);
  const showReady = todos.some((todo) => todo.status === 'Ready');

  return (
    <div className="grid grid-cols-4 gap-3">
      <TodoList status="" />
      {showReady && <TodoList status="Ready" />}
      <TodoList status="In progress" />
      <TodoList status="Completed" />
    </div>
  );
}
