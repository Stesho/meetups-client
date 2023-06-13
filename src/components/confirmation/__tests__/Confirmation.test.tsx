import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Confirmation';
import { IntlProvider } from 'react-intl';
import English from '../../../i18n/en-US.json';
import confirmationStore from '../../../mocks/mockConfirmationStore';
import Translation from '../../../core/utils/translation';

let mockConfirmationStore = {...confirmationStore}; 

jest.mock('../../../context/storeContext', () => ({
  useStore: () => mockConfirmationStore
}));

const ModalWrapper = (): JSX.Element => (
  <IntlProvider messages={English} locale='en'>
    <Modal />
  </IntlProvider>
)

describe('Confirmation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConfirmationStore = {...confirmationStore};
  });

  it('should render specified title and text', () => {
    mockConfirmationStore.title = Translation.plainText('Title');
    mockConfirmationStore.text = Translation.plainText('Some text');

    render(<ModalWrapper />);

    const title = screen.getByText(/Title/i);
    const text = screen.getByText(/Some text/i);
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('should hide if is not active', () => {
    mockConfirmationStore.isActive = false;

    render(<ModalWrapper />);

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toHaveClass('close');
  });

  it('should invoke appropriate function on close click', () => {
    render(<ModalWrapper />);

    const buttons = screen.getByTestId('buttons');
    const cancelBtn = buttons.childNodes[0];

    fireEvent.click(cancelBtn);
    expect(mockConfirmationStore.close).toHaveBeenCalledTimes(1);
  });

  it('should invoke appropriate function on confirm click', () => {
    render(<ModalWrapper />);

    const buttons = screen.getByTestId('buttons');
    const confirmBtn = buttons.childNodes[1];

    fireEvent.click(confirmBtn);
    expect(mockConfirmationStore.onConfirm).toHaveBeenCalledTimes(1);
  });
});
