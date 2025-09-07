import { useEffect, useMemo, useRef, useState } from "react";

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function getMonthGrid(currentMonth) {
  const start = startOfMonth(currentMonth);
  const startDay = start.getDay();
  const firstCellDate = new Date(start);
  firstCellDate.setDate(firstCellDate.getDate() - startDay);

  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(firstCellDate);
    d.setDate(firstCellDate.getDate() + i);
    cells.push(d);
  }
  return cells;
}

function toISODate(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonthYear(d) {
  return d.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

export default function DatePickerModal({ initialDateISO, onClose, onSelect }) {
  const initial = initialDateISO ? new Date(initialDateISO) : new Date();
  const [viewMonth, setViewMonth] = useState(startOfMonth(initial));
  const grid = useMemo(() => getMonthGrid(viewMonth), [viewMonth]);
  const backdropRef = useRef(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function isSameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  const today = new Date();
  const selected = initialDateISO ? new Date(initialDateISO) : null;

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-xl bg-white p-4 shadow-xl">
        <div className="mb-3 flex items-center justify-between">
          <button
            onClick={() => setViewMonth((m) => addMonths(m, -1))}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Previous month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          <div className="text-sm font-medium text-gray-900">
            {formatMonthYear(viewMonth)}
          </div>
          <button
            onClick={() => setViewMonth((m) => addMonths(m, 1))}
            className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800"
            aria-label="Next month"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M8.25 4.5 15.75 12l-7.5 7.5" />
            </svg>
          </button>
        </div>

        <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs text-gray-500">
          {"SMTWTFS".split("").map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {grid.map((d) => {
            const inMonth = d.getMonth() === viewMonth.getMonth();
            const isToday = isSameDay(d, today);
            const isSelected = selected && isSameDay(d, selected);
            return (
              <button
                key={d.toISOString()}
                onClick={() => {
                  onSelect(toISODate(d));
                  onClose();
                }}
                className={
                  "h-9 rounded-md text-sm transition " +
                  (isSelected
                    ? "bg-gray-900 text-white"
                    : isToday
                    ? "border border-gray-900 text-gray-900"
                    : inMonth
                    ? "text-gray-800 hover:bg-gray-100"
                    : "text-gray-400 hover:bg-gray-50")
                }
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => setViewMonth(startOfMonth(new Date()))}
            className="rounded-md px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100"
          >
            Today
          </button>
          <div className="flex items-center gap-2">
            {selected && (
              <button
                onClick={() => onSelect("")}
                className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-black/90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
