// Type function updateUser. See js example for more details below.

function updateUser(user, newValues) {
  return { ...user, ...newValues };
}

const updatedUser = updateUser(user, { isOnline: true });
const updatedUser2 = updateUser(user, { age: 25, lastName: "Petrov" });
