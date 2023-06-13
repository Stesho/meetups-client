import Translation from "../core/utils/translation";

const mockNotificationStore = {
  type: '',
  message: Translation.empty,
  timer: 0,
  isActive: false,
  duration: 0,
  clear: jest.fn(),
  show: jest.fn(),
  error: jest.fn(),
  success: jest.fn(),
  close: jest.fn(),
}

export default mockNotificationStore;
