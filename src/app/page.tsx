"use client"
import './styles.css';
import './output.css';
import { SwitchHorizontalIcon } from '@heroicons/react/outline';

import React from 'react';
import { useEffect } from 'react';
import { Header } from '@/components/layout';
import { TodoListRows } from '@/modules/todo-list';
import { ModeToggle } from './mode-switcher';

function Home() {
  
  return (
    <div className="flex h-screen w-full flex-col sm:max-w-full dark:bg-black  duration-300  ">
      <Header/>
      <ModeToggle/>
      <TodoListRows />
    </div>
    
  );
}
export default Home;
