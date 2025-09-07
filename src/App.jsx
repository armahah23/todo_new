import "./App.css";
import TodoApp from "./components/TodoApp";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <div className="mx-auto max-w-2xl p-6">
        <TodoApp />
      </div>
    </div>
  );
}

export default App;
