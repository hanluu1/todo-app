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
  status: string;
}
interface Tag {
  title: string;
  color: string;
}

interface TodoStoreState {
  todos: Todo[];
  setTodos: (data: Todo[]) => void;
  addTodo: (todo: Todo) => void;
  completeTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, data: any) => void;
  //
  tags: Tag[];
  addTag: (tag: Tag) => void;
  editTag: (title: string, newTitle: string, newColor: string) => void;
  deleteTag: (title: string) => void;
  //
  status: string[];
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

const STATUS_PRESET = ["To do", "In progress", "Completed"];

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
      //
      tags: TAG,
      editTag: (title: string, newTitle: string, newColor: string) => {
        set((state) => ({
          tags: state.tags.map((tag) => (tag.title === title ? { ...tag, title: newTitle, color: newColor } : tag)),
        }));
      },
      deleteTag: (title: string) => {
        set((state) => ({
          tags: state.tags.filter((tag) => tag.title !== title),
        }));
      },
      //
      status: STATUS_PRESET,
    }),

    {
      version: 2,
      name: "todo-storage",
    }
  )
);
