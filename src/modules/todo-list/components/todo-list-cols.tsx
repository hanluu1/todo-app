'use client';

import React from 'react';

import { TodoList } from './todo-list';

export function TodoListCols() {
  return (
    <div className="grid grid-cols-4 gap-3">
      <TodoList status="" />
      <TodoList status="Ready" />
      <TodoList status="In progress" />
      <TodoList status="Completed" />
    </div>
  );
}
