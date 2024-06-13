import useUsers from "@/hooks/useUsers";
import userService, { User } from "@/services/user-service";

function GetUsersApp() {
  const { users, setUsers, error, setError, isLoading } = useUsers();

  /**
   * Encapsulate logic of reverting optimistically-updated user data
   * with a message when an error occurs.
   */
  function setUserWithUndo(newUsers: User[]) {
    const originalUsers = [...users];
    setUsers(newUsers);

    return {
      revertWithError: (error: string) => {
        setError(error);
        setUsers(originalUsers);
      },
    };
  }

  const deleteUser = ({ id }: User) => {
    const { revertWithError } = setUserWithUndo(
      users.filter((user) => user.id !== id)
    );
    userService.delete(id).catch((err) => {
      revertWithError(err.message as string);
    });
  };

  /*
   * Note: Seems confusing that we're adding the same user twice: Once
   * optimistically and again after POST success. The reason this works
   * is because the `users` object that we're passing to `setUsers` never
   * changes due to closure state. If we used setUsers((users) => ...) then
   * we'd have duplicate users since the `user` object passed to the callback
   * of that version has been updated with the original addition.
   */
  const addUser = () => {
    const username = prompt(`New username:`)?.trim();
    if (username) {
      const newUser = { id: 0, username };
      const { revertWithError } = setUserWithUndo([newUser, ...users]);
      userService
        .create(newUser)
        .then(({ data: savedUser }) => {
          setUsers([savedUser, ...users]);
        })
        .catch((err) => {
          revertWithError(err.message);
        });
    }
  };

  const updateUser = (user: User) => {
    const username = prompt(`Change username ${user.username} to:`)?.trim();

    if (username) {
      const patchedUser = { ...user, username };
      const { revertWithError } = setUserWithUndo(
        users.map((u) => (u.id === user.id ? patchedUser : u))
      );
      userService.update(patchedUser).catch((err) => {
        revertWithError(err.message);
      });
    }
  };

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <button className="btn btn-primary mb-3" onClick={addUser}>
        Add
      </button>
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.username}
            <div>
              <button
                className="btn btn-outline-secondary mx-1"
                onClick={() => updateUser(user)}
              >
                Update
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteUser(user)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GetUsersApp;
