import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Todo {
  is_completed: boolean;
  id: string;
  title: string;
  tags: {
    title: string;
    color: string;
  }[];
}
interface Tag {
  title: string;
  color: string;
}
interface TodoStoreState {
  todos: Todo[];
  tags: Tag[];
  setTodos: (data: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  addTag: (tag: Tag) => void;
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, data: any) => void;
  editTag: (title: string, newTitle: string, newColor: string) => void;
  deleteTag: (title: string) => void;
}

const TAG = [
  {
    title: "Workout",
    color: "#0de040",
  },
  {
    title: "Study",
    color: "#0d8787",
  },
  {
    title: "Work In Office",
    color: "#0de040",
  },
  {
    title: "Meeting",
    color: "#0d8787",
  },
];
export const useTodoStore = create<TodoStoreState>()(
  persist(
    (set) => ({
      todos: [],
      tags: TAG,
      setTodos: (data: Todo[]) => {
        set({ todos: data });
      },
      addTodo: (todo: Todo) => {
        set((state) => ({ todos: [...state.todos, todo] })); // replace
      },
      addTag: (tag: Tag) => {
        set((state) => ({ tags: [...state.tags, tag] }));
      },
      completeTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, is_completed: !todo.is_completed } : todo)), // replace
        }));
      },
      deleteTodo: (id: string) => {
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        }));
      },
      updateTodo: (id: string, data: any) => {
        set((state) => ({
          todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...data } : todo)),
        }));
      },
      editTag: (title: string, newTitle: string, newColor: string) => {
        set((state) => ({
          tags: state.tags.map((tag) => (tag.title === title ? { ...tag, title: newTitle, color: newColor } : tag)),
        }));
      },
      deleteTag: (title: string) =>
        set((state) => ({
          tags: state.tags.filter((tag) => tag.title !== title),
        })),
    }),

    {
      version: 2,
      name: "todo-storage",
    }
  )
);
