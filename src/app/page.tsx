'use client';

import './styles.css';

import React from 'react';

import { Header } from '@/components/layout';
import { TodoListRows } from '@/modules/todo-list';

import { ModeToggle } from './mode-switcher';

function Home() {
  return (
    <div className="flex h-screen w-full flex-col duration-300 sm:max-w-full  dark:bg-black  ">
      <Header />
      <ModeToggle />
      <TodoListRows />
    </div>
  );
}
export default Home;
