"use client";

function TODOHero({ todos_completed, total_todos}) {
    return (
        <section className="todohero_section ">
            <div className="">
                <p className="text-3xl text-zinc-600">Task Done</p>
                <p className="text-xl text-zinc-600">Keep it up</p>
            </div>
            <div className="text-zinc-600">
                {todos_completed}/{total_todos}
            </div>
        </section>
    )
}
export default TODOHero;