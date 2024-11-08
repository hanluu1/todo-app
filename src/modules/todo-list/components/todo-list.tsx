"use client";
import { Todo, useTodoStore } from "@/stores";
import React, { useRef, useState } from "react";
import {
  ExclamationIcon,
  PencilAltIcon,
  TrashIcon,
  CheckIcon,
  XIcon,
  TagIcon,
  PlusCircleIcon,
  BackspaceIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

import clsx from "clsx";
import { TodoItem } from "./todo-item";

export function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  return (
    <ol className="self-center w-full max-w-96 flex flex-col items-center my-6 gap-6">
      {todos && todos.length > 0 ? (
        todos?.map((item, index) => <TodoItem key={index} item={item} />)
      ) : (
        <p className="text-zinc-600">I feel empty, give me some tasks</p>
      )}
    </ol>
  );
}
