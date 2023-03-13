import { KeyboardEvent, useState, useTransition } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css'

interface Todo {
  state: 'done' | 'ongoing';
  id: string;
  text: string;
}

function App() {
  const [todos, setTodos] = useState([
    { id: '1', text: 'git add .', state: 'done' },
    { id: '2', text: 'git commit', state: 'done' },
    { id: '3', text: 'git push', state: 'ongoing' },
    { id: '4', text: 'escape building', state: 'ongoing' },
  ] as Todo[]);

  const addTodo = (text: string) => {
    const t: Todo = {
      state: 'ongoing',
      text,
      id: uuid(),
    }
    setTodos((ts) => [...ts, t])
  }

  const removeTodo = (id: string) => {
    setTodos((ts) => ts.filter(t => t.id !== id));
  }

  return <>
    <h1>TODO Web App</h1>
    <section>
      <AddTodo addTodo={addTodo} />
      <Counter todos={todos}></Counter>
      <TodoList todos={todos} removeTodo={removeTodo}></TodoList>
    </section>
  </>
}

function AddTodo({ addTodo }: { addTodo: (s: string) => void }) {
  const [value, setValue] = useState('');

  const keyUpHandler = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && value !== '') {
      addTodo(value);
    }
  }
  return <input
    type="text"
    value={value}
    onChange={(v) => setValue(v.target.value)}
    onKeyUp={keyUpHandler}
    placeholder="Insert text..." />
}

function Counter({ todos }: { todos: Todo[] }) {
  const completed = todos.filter(({ state }) => state === 'done').length;
  return <span className="counter">{completed}/{todos.length}</span>
}

function TodoList({ todos, removeTodo }: { todos: Todo[], removeTodo: (id: string) => void }) {
  return <ul>
    {todos.map((t) => (
      <li key={t.id}>
        <TodoItem removeTodo={removeTodo} todo={t}></TodoItem>
      </li>
    ))}
  </ul>
}

function TodoItem({ todo, removeTodo }: {
  todo: Todo,
  removeTodo: (id: string) => void
}) {
  return (
    <div className="todo-item">
      <div>
        <input type="checkbox" checked={todo.state === 'done'} />
        <span className={todo.state === 'done' ? todo.state : ''}>{todo.text}</span>
        <button onClick={() => removeTodo(todo.id)}>×</button>
      </div>
      <input className="hidden" type="text" />
    </div>
  );
}
export default App
