import React from "react";

export function TodoHero({ todosCompleted, totalTodos }: { todosCompleted: number; totalTodos: number }) {
  return (
    <section className="border border-black rounded-xl flex justify-around items-center self-center w-full max-w-96 p-5">
      <div className="">
        <p className="text-3xl text-zinc-600">Task Done</p>
        <p className="text-xl text-zinc-600">Keep it up</p>
      </div>
      <div className="text-zinc-600 bg-[#f6f6d9] w-[150px] h-[150px] rounded-full text-5xl flex items-center justify-center text-center">
        {todosCompleted}/{totalTodos}
      </div>
    </section>
  );
}
