// Type function updateUser. See js example for more details below.

interface User {
  id: string,
  firstName: string,
  lastName: string,
  isOnline: boolean,
  age: number,
  role: string
}

function updateUser(user: User, newValues: Partial<User>) {
  return { ...user, ...newValues };
}

const user: User = {
  id: "111",
  firstName: "Ivan",
  lastName: "Ivanov",
  isOnline: false,
  age: 20,
  role: "user",
};

const updatedUser = updateUser(user, { isOnline: true });
const updatedUser2 = updateUser(user, { age: 25, lastName: "Petrov" });
