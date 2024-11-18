'use client';

import React from 'react';

import { useTodoStore } from '@/stores';

import { TodoList } from './todo-list';

export function TodoListCols() {
  const todos = useTodoStore((state) => state.todos);
  const showReady = todos.some((todo) => todo.status === 'Ready');
  const showInProgress = todos.some((todo) => todo.status === 'In progress');
  const showComplete= todos.some((todo) => todo.status === 'Completed');
  const showDefault = !showReady && !showInProgress && !showComplete;
  

  return (
 
    <div className={`grid ${
      showDefault ? 'grid-cols-1 place-items-center' : 'grid-cols-4'
    } gap-3`}>
      {showDefault && <TodoList status="" />}
      {!showDefault && (
        <>
        <TodoList status="" />
        {showReady && <TodoList status="Ready" />}
        {showInProgress && <TodoList status="In progress" />}
        {showComplete && <TodoList status="Completed" />}
        </>
      )}
      
    </div>
  )
}
