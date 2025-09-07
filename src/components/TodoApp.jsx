import { useEffect, useMemo, useState } from "react";
import TodoItem from "./TodoItem";
import useLocalStorage from "../hooks/useLocalStorage";
import DatePickerModal from "./DatePickerModal";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

const FILTERS = {
  all: {
    label: "All",
    predicate: () => true,
  },
  active: {
    label: "Active",
    predicate: (t) => !t.completed,
  },
  completed: {
    label: "Completed",
    predicate: (t) => t.completed,
  },
};

export default function TodoApp() {
  const [storedTodos, setStoredTodos] = useLocalStorage("todos", []);
  const [todos, setTodos] = useState(storedTodos);
  const [newTitle, setNewTitle] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [filterKey, setFilterKey] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setStoredTodos(todos);
  }, [todos, setStoredTodos]);

  const remainingCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos]
  );

  const hasCompleted = useMemo(() => todos.some((t) => t.completed), [todos]);

  const filteredTodos = useMemo(() => {
    const byFilter = todos.filter(FILTERS[filterKey].predicate);
    if (!searchQuery.trim()) return byFilter;
    const q = searchQuery.toLowerCase();
    return byFilter.filter((t) => t.title.toLowerCase().includes(q));
  }, [todos, filterKey, searchQuery]);

  function handleAddTodo(e) {
    e.preventDefault();
    const title = newTitle.trim();
    if (!title) return;
    const next = [
      {
        id: generateId(),
        title,
        completed: false,
        createdAt: Date.now(),
        dueDate: newDueDate || null,
      },
      ...todos,
    ];
    setTodos(next);
    setNewTitle("");
    setNewDueDate("");
  }

  function handleToggle(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleEdit(id, title) {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));
  }

  function handleDelete(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function handleClearCompleted() {
    setTodos((prev) => prev.filter((t) => !t.completed));
  }

  function handleToggleAll() {
    const allCompleted = todos.length > 0 && todos.every((t) => t.completed);
    setTodos((prev) => prev.map((t) => ({ ...t, completed: !allCompleted })));
  }

  function handleReorder(fromId, toId) {
    if (fromId === toId) return;
    setTodos((prev) => {
      const fromIndex = prev.findIndex((t) => t.id === fromId);
      const toIndex = prev.findIndex((t) => t.id === toId);
      if (fromIndex === -1 || toIndex === -1) return prev;
      const next = [...prev];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  }

  const todayLabel = useMemo(() => {
    try {
      return new Date().toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return new Date().toDateString();
    }
  }, []);

  return (
    <div className="space-y-6">
      <header className="pt-6">
        <div className="flex items-baseline justify-between gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">Tasks</h1>
          <span className="text-sm text-gray-500">{todayLabel}</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          A minimal, modern to-do app.
        </p>
      </header>

      <form onSubmit={handleAddTodo} className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleToggleAll}
          title="Toggle all"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M9 12.75 11.25 15 15 9.75" />
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm9.75-6a.75.75 0 0 1 .75.75V12a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06l2.03-2.03V6.75a.75.75 0 0 1 .75-.75Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm shadow-sm outline-none transition placeholder:text-gray-400 focus:border-gray-300 focus:ring-2 focus:ring-gray-200"
        />
        <button
          type="button"
          onClick={() => setIsDateOpen(true)}
          title="Pick date"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 shadow-sm transition hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path d="M6.75 3.75A.75.75 0 0 1 7.5 3h.75a.75.75 0 0 1 .75.75V6h6V3.75A.75.75 0 0 1 15.75 3h.75a.75.75 0 0 1 .75.75V6h.75A2.25 2.25 0 0 1 21 8.25v9A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25v-9A2.25 2.25 0 0 1 5.25 6H6V3.75Z" />
          </svg>
          <span>Date</span>
        </button>
        <button
          type="submit"
          className="inline-flex h-10 items-center rounded-lg bg-gray-900 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800"
        >
          Add
        </button>
      </form>

      <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {filteredTodos.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-gray-500">
            No tasks to show
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => handleToggle(todo.id)}
                onEdit={(title) => handleEdit(todo.id, title)}
                onDelete={() => handleDelete(todo.id)}
                onReorder={(toId) => handleReorder(todo.id, toId)}
                prevId={filteredTodos[index - 1]?.id}
                nextId={filteredTodos[index + 1]?.id}
              />
            ))}
          </ul>
        )}
      </section>

      <footer className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
        <span>
          {remainingCount} {remainingCount === 1 ? "task" : "tasks"} left
        </span>
        {hasCompleted && (
          <button
            onClick={handleClearCompleted}
            className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-gray-700 shadow-sm transition hover:bg-gray-50"
          >
            Clear completed
          </button>
        )}
      </footer>

      {isDateOpen && (
        <DatePickerModal
          initialDateISO={newDueDate}
          onClose={() => setIsDateOpen(false)}
          onSelect={(iso) => setNewDueDate(iso)}
        />
      )}
    </div>
  );
}
