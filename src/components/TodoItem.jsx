import { useEffect, useRef, useState } from "react";

export default function TodoItem({ todo, onToggle, onEdit, onDelete, onReorder, prevId, nextId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function submitEdit() {
    const value = draft.trim();
    if (!value) {
      onDelete();
      return;
    }
    if (value !== todo.title) onEdit(value);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") submitEdit();
    if (e.key === "Escape") {
      setDraft(todo.title);
      setIsEditing(false);
    }
  }

  const isOverdue = (() => {
    if (!todo.dueDate || todo.completed) return false;
    const due = new Date(todo.dueDate);
    if (Number.isNaN(due.getTime())) return false;
    return due.getTime() < Date.now();
  })();

  return (
    <li className={("group flex items-center gap-3 px-4 py-3 " + (isOverdue ? "bg-red-600 text-white" : ""))}>
      <button
        onClick={onToggle}
        className={
          "flex h-5 w-5 items-center justify-center rounded border transition " +
          (todo.completed
            ? (isOverdue ? "border-white bg-white/20 text-white" : "border-gray-900 bg-gray-900 text-white")
            : (isOverdue ? "border-white/80 bg-transparent text-transparent hover:border-white" : "border-gray-300 bg-white text-transparent hover:border-gray-400"))
        }
        aria-label={todo.completed ? "Mark as active" : "Mark as completed"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M9 12.75 11.25 15 15 9.75" />
        </svg>
      </button>

      <div className="flex-1">
        {isEditing ? (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={submitEdit}
            onKeyDown={handleKeyDown}
            className={("w-full rounded-md border px-2 py-1 text-sm outline-none focus:ring-2 " + (isOverdue ? "border-white/70 bg-white/10 text-white placeholder-white/60 focus:border-white/80 focus:ring-white/30" : "border-gray-300 focus:border-gray-400 focus:ring-gray-200"))}
          />
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className={
              "w-full text-left text-sm transition " +
              (todo.completed ? (isOverdue ? "text-white/70 line-through" : "text-gray-400 line-through") : (isOverdue ? "text-white" : "text-gray-800"))
            }
            title="Click to edit"
          >
            {todo.title}
          </button>
        )}
        {todo.dueDate && (
          <div className={("mt-1 inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] " + (isOverdue ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"))}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3 w-3">
              <path d="M6.75 3.75A.75.75 0 0 1 7.5 3h.75a.75.75 0 0 1 .75.75V6h6V3.75A.75.75 0 0 1 15.75 3h.75a.75.75 0 0 1 .75.75V6h.75A2.25 2.25 0 0 1 21 8.25v9A2.25 2.25 0 0 1 18.75 19.5H5.25A2.25 2.25 0 0 1 3 17.25v-9A2.25 2.25 0 0 1 5.25 6H6V3.75Z" />
            </svg>
            <span>{todo.dueDate}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
        {prevId && (
          <button
            onClick={() => onReorder(prevId)}
            className={("rounded-md p-1 transition " + (isOverdue ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"))}
            title="Move up"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 4.5 5.25 11.25 6.31 12.31 11.25 7.37 11.25 19.5 12.75 19.5 12.75 7.37 17.69 12.31 18.75 11.25z" />
            </svg>
          </button>
        )}
        {nextId && (
          <button
            onClick={() => onReorder(nextId)}
            className={("rounded-md p-1 transition " + (isOverdue ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"))}
            title="Move down"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
              <path d="M12 19.5 18.75 12.75 17.69 11.69 12.75 16.63 12.75 4.5 11.25 4.5 11.25 16.63 6.31 11.69 5.25 12.75z" />
            </svg>
          </button>
        )}
        <button
          onClick={onDelete}
          className={("rounded-md p-1 transition " + (isOverdue ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-gray-500 hover:bg-red-50 hover:text-red-600"))}
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M16.5 4.5V6h3a.75.75 0 0 1 0 1.5h-.507l-.93 10.03A2.25 2.25 0 0 1 15.822 19.5H8.178a2.25 2.25 0 0 1-2.241-1.97L5.007 7.5H4.5A.75.75 0 0 1 4.5 6h3V4.5A1.5 1.5 0 0 1 9 3h6a1.5 1.5 0 0 1 1.5 1.5ZM9 6h6V4.5H9V6Zm-.72 3.53a.75.75 0 0 1 1.06 0L12 11.19l2.66-2.66a.75.75 0 1 1 1.06 1.06L13.06 12.25l2.66 2.66a.75.75 0 0 1-1.06 1.06L12 13.31l-2.66 2.66a.75.75 0 0 1-1.06-1.06l2.66-2.66-2.66-2.66a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </li>
  );
}
