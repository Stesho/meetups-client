const mockUserStore = {
  user: null,
  role: '',
  singIn: jest.fn(),
  fetchUser: jest.fn(),
  logout: jest.fn(),
}

export default mockUserStore;