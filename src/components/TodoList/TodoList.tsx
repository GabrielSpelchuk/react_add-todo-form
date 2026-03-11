import { TodoInfo } from '../TodoInfo';
import User from '../../types/User';
import Todo from '../../types/Todo';

interface TodoListInterface {
  users: User[];
  todoList: Todo[];
}

export const TodoList = ({ users, todoList }: TodoListInterface) => {
  return (
    <>
      {todoList.map((todo: Todo) => (
        <TodoInfo users={users} todo={todo} key={todo.id} />
      ))}
    </>
  );
};
