import cn from 'classnames';
import User from '../../types/User';
import Todo from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoInterface {
  users: User[];
  todo: Todo;
}

export const TodoInfo = ({ users, todo }: TodoInterface) => {
  const user = users.find(u => u.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
