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
  
  tags: Tag[];
  addTag: (tag: Tag) => void;
  editTag: (title: string, newTitle: string, newColor: string) => void;
  deleteTag: (title: string) => void;
  
  status: string[];
}

const TAG = [
  {
    title: "Workout",
    color: "#FFDBDA",
  },
  {
    title: "Study",
    color: "#bee3db",
  },
  {
    title: "Meeting",
    color: "#555b6e",
  },
];

const STATUS_PRESET = ["Ready", "In progress", "Completed"];

export const useTodoStore = create<TodoStoreState>()(
  persist(
    (set) => ({
      //add task store
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
      //tag store
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
      //status store
      status: STATUS_PRESET,
    }),

    {
      version: 1,
      name: "todo-storage",
    }
  )
);
