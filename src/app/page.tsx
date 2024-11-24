import './styles.css';
import './output.css';

import React from 'react';

import { Header } from '@/components/layout';
import { TodoListRows } from '@/modules/todo-list';

function Home() {
  return (
    <div className="flex h-screen w-10/12  flex-col sm:max-w-full ">
      <Header />
      <TodoListRows />
    </div>
  );
}
export default Home;
