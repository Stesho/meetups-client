// Describe interface User that has the following properties: id, firstName, lastName, isOnline, age, role, address. See
// usage example below

interface Address {
  city: string,
  country: string,
  zip: string,
}

interface User {
  id: string,
  firstName: string,
  lastName: string,
  isOnline: boolean,
  age?: number,
  role: 'user' | 'admin',
  address: Address | null; 
}

const user1: User = {
  id: "111",
  firstName: "Ivan",
  lastName: "Ivanov",
  isOnline: false,
  age: 20,
  role: "user",
  address: {
    city: "Minsk",
    country: "Belarus",
    zip: "220000",
  },
};

const user2: User = {
  id: "222",
  firstName: "Ivan",
  lastName: "Ivanov",
  isOnline: false,
  age: 20,
  role: "user",
  address: null,
};

const user3: User = {
  id: "333",
  firstName: "Ivan",
  lastName: "Ivanov",
  isOnline: false,
  role: "user",
  address: null,
};
