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
  email: string;
  address: UserAddress;
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

  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between"
          >
            {user.username}
            <button
              className="btn btn-outline-danger"
              onClick={() => deleteUser(user)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GetUsersApp;
