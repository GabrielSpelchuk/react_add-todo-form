import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { useState } from 'react';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [triedSubmitTitle, setTriedSubmitTitle] = useState(false);
  const [triedSubmitUser, setTriedSubmitUser] = useState(false);

  const isValid = (): boolean => {
    if (title !== '' && userId !== 0) {
      return true;
    }

    return false;
  };

  const nextId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        noValidate
        onSubmit={event => {
          event.preventDefault();
          if (!isValid()) {
            setTriedSubmitTitle(true);
            setTriedSubmitUser(true);

            return;
          }

          const todo = {
            id: nextId,
            title,
            completed: false,
            userId,
          };

          setTodos([...todos, todo]);
          setTitle('');
          setUserId(0);
          setTriedSubmitTitle(false);
          setTriedSubmitUser(false);
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => setTitle(event.target.value)}
            required
          />

          {title === '' && triedSubmitTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={value => setUserId(+value.target.value)}
            required
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userId === 0 && triedSubmitUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList users={usersFromServer} todoList={todos} />
      </section>
    </div>
  );
};
