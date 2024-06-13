import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; long: string };
}

interface User {
  id: number;
  username: string;
  email?: string;
  address?: UserAddress;
}

function GetUsersApp() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Reset
    setUsers([]);
    setError("");

    setLoading(true);
    const controller = new AbortController();

    // simulate a delay
    setTimeout(() => {
      axios
        .get<User[]>("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal,
        })
        .then((res) => setUsers(res.data))
        .catch((err) =>
          err instanceof CanceledError ? null : setError(err.message)
        )
        .finally(() => setLoading(false));
    }, 100);

    return () => controller.abort();
  }, []);

  const deleteUser = ({ id }: User) => {
    const originalUsers = [...users];
    setUsers(users.filter((user) => user.id !== id));
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .catch((err) => {
        setError(err.message);
        setUsers(originalUsers);
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
    const originalUsers = [...users];
    const username = prompt(`New username:`)?.trim();
    if (username) {
      const newUser = { id: 0, username };
      setUsers([newUser, ...users]);
      axios
        .post("https://jsonplaceholder.typicode.com/users/", newUser)
        .then(({ data: savedUser }) => {
          setUsers([savedUser, ...users]);
        })
        .catch((err) => {
          setError(err.message);
          setUsers(originalUsers);
        });
    }
  };

  const updateUser = (user: User) => {
    const originalUsers = [...users];
    const username = prompt(`Change username ${user.username} to:`)?.trim();

    if (username) {
      const patchedUser = { ...user, username };
      setUsers(users.map((u) => (u.id === user.id ? patchedUser : u)));
      axios
        .patch(
          `https://jsonplaceholder.typicode.com/users/${user.id}`,
          patchedUser
        )
        .catch((err) => {
          setError(err.message);
          setUsers(originalUsers);
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
