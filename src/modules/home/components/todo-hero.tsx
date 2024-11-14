import React from 'react';

export function TodoHero({ todosCompleted, totalTodos }: { todosCompleted: number; totalTodos: number }) {
  return (
    <section className="flex w-full max-w-96 items-center justify-around self-center rounded-xl border border-black p-5">
      <div className="">
        <p className="text-3xl text-zinc-600">Task Done</p>
        <p className="text-xl text-zinc-600">Keep it up</p>
      </div>
      <div className="flex size-[150px] items-center justify-center rounded-full bg-[#E5F1F3] text-center text-5xl text-zinc-600">
        {todosCompleted}/{totalTodos}
      </div>
    </section>
  );
}
