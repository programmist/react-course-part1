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

  useEffect(() => {
    // Reset
    setData([]);
    setError("");

    const controller = new AbortController();
    axios
      .get<User[]>("https://jsonplaceholder.typicode.com/users", {
        signal: controller.signal,
      })
      .then((res) => setData(res.data))
      .catch((err) =>
        err instanceof CanceledError ? null : setError(err.message)
      );

    return () => controller.abort();
  }, []);
  return (
    <>
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
