"use client";

import { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }]);
    setInput("");
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTodo();
  };

  const remaining = todos.filter((t) => !t.completed).length;
  const completed = todos.length - remaining;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-5">
          <h1 className="text-2xl font-bold text-white">TODOリスト</h1>
          {todos.length > 0 && (
            <p className="text-blue-100 text-sm mt-1">
              {completed}/{todos.length} 件完了
            </p>
          )}
        </div>

        <div className="p-6">
          {/* 入力フォーム */}
          <div className="flex gap-2 mb-5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="タスクを入力..."
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
            <button
              onClick={addTodo}
              disabled={!input.trim()}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              追加
            </button>
          </div>

          {/* TODOリスト */}
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-4xl mb-3">📋</p>
              <p className="text-gray-400 text-sm">タスクがありません</p>
              <p className="text-gray-300 text-xs mt-1">上の入力欄からタスクを追加しましょう</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all ${
                    todo.completed
                      ? "border-gray-100 bg-gray-50"
                      : "border-gray-100 hover:border-blue-100 hover:bg-blue-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-4 h-4 accent-blue-500 cursor-pointer shrink-0"
                  />
                  <span
                    className={`flex-1 text-sm font-medium transition-colors ${
                      todo.completed ? "line-through text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="w-6 h-6 flex items-center justify-center rounded-full text-gray-300 hover:text-white hover:bg-red-400 transition-all text-sm leading-none shrink-0"
                    aria-label="削除"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* フッター */}
          {todos.length > 0 && (
            <div className="mt-5 pt-4 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs text-gray-500 font-medium">{remaining} 件残っています</span>
              {completed > 0 && (
                <button
                  onClick={() => setTodos(todos.filter((t) => !t.completed))}
                  className="text-xs text-gray-400 hover:text-red-500 font-medium transition-colors px-2 py-1 rounded hover:bg-red-50"
                >
                  完了済みを削除
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
