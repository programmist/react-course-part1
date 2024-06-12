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
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    // Reset
    setData([]);
    setError("");

    setLoading(true);
    const controller = new AbortController();

    // simulate a delay
    setTimeout(() => {
      axios
        .get<User[]>("https://jsonplaceholder.typicode.com/users", {
          signal: controller.signal,
        })
        .then((res) => setData(res.data))
        .catch((err) =>
          err instanceof CanceledError ? null : setError(err.message)
        )
        .finally(() => setLoading(false));
    }, 1000);

    return () => controller.abort();
  }, []);
  return (
    <>
      {isLoading && <div className="spinner-border"></div>}
      {error && <p className="text-danger">{error}</p>}
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.username + " : " + user.email}</li>
        ))}
      </ul>
    </>
  );
}

export default GetUsersApp;
