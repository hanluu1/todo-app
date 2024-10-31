import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Todo {
  is_completed: boolean;
  id: string;
  title: string;
  
  
}
interface TodoStoreState {
  todos: Todo[];
  setTodos: (data: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  completeTodo: (id: string) => void;
  deleteTodo:(id: string) => void;
  updateTodo:(id: string, title: string) => void;
}

export const useTodoStore = create<TodoStoreState>()(
  persist(
    (set) => ({
      todos: [],
      setTodos: (data: Todo[]) => {
        set({ todos: data });
      },
      addTodo: (todo: Todo) => {
        set((state) => ({ todos: [...state.todos, todo] })); // replace
      },
      completeTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo)), // replace
        }));
      },
      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo)=> todo.id !== id),

        }));
      },
      updateTodo: (id: string, title: string) => {
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? {...todo, title} : todo))
        }))
      },
      
    }),
        
    {
      version: 1,
      name: "todo-storage",
    }
  )
);

