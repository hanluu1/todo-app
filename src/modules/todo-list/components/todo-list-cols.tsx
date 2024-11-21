'use client';

import React from 'react';

import { useTodoStore } from '@/stores';

import { TodoList } from './todo-list';
import clsx from 'clsx';

export function TodoListCols() {
  const todos = useTodoStore((state) => state.todos);
  const showInProgress = todos.some((todo) => todo.status === 'In progress');
  const showComplete= todos.some((todo) => todo.status === 'Completed');
  const showDefault =  !showInProgress && !showComplete;
  

  return (
 
    <div className={clsx('flex gap-3 ',
      {'flex-col place-items-center': showDefault,
        'flex-col gap-6': !showDefault,
      }
   )}>
      {showDefault && <TodoList status="" />}
      {!showDefault && (
        <>
        <TodoList status="" />
        {showInProgress && <TodoList status="In progress" />}
        {showComplete && <TodoList status="Completed" />}
        </>
      )}
      
    </div>
  )
}
