import Translation from "../core/utils/translation"

const mockConfirmationStore = {
  isActive: true,
  title: Translation.empty,
  text: Translation.empty,
  onConfirm: jest.fn(),
  show: jest.fn(),
  close: jest.fn()
}

export default mockConfirmationStore;