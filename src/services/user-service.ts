import apiClient from "./api-client";

interface UserAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: { lat: string; long: string };
}

export interface User {
  id: number;
  username: string;
  email?: string;
  address?: UserAddress;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<User[]>("/users", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

  deleteUser(id: number) {
    return apiClient.delete(`/users/${id}`);
  }

  addUser(user: User) {
    return apiClient.post("/users", user);
  }

  updateUser(user: User) {
    return apiClient.patch(`/users/${user.id}`, user);
  }
}

export default new UserService();
