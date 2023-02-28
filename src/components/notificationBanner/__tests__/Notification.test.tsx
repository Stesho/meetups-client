import { render, screen, fireEvent } from '@testing-library/react';
import NotificationBanner from "../NotificationBanner";
import notificationStore from "../../../mocks/mockNotificationStore";
import Translation from "../../../core/utils/translation";
import { IntlProvider } from "react-intl";
import English from '../../../i18n/en-US.json';

let mockNotificationStore = {...notificationStore}; 

jest.mock('../../../context/storeContext', () => ({
  useStore: () => mockNotificationStore
}));

const NotificationWrapper = (): JSX.Element => (
  <IntlProvider messages={English} locale='en'>
    <NotificationBanner />
  </IntlProvider>
)

describe('Notification banner', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNotificationStore = {...notificationStore};
  })

  it('should render specified title and message', () => {
    mockNotificationStore.type = 'error';
    mockNotificationStore.isActive = true;
    mockNotificationStore.message = Translation.plainText('some text');

    render(<NotificationWrapper />);

    const title = screen.getByText(/error/i);
    const text = screen.getByText(/some text/i);
    expect(title).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });

  it('should not render if is not active', () => {
    mockNotificationStore.isActive = false;
    mockNotificationStore.type = 'success';

    render(<NotificationWrapper />);

    const notification = screen.queryByTestId('notification');
    expect(notification).not.toBeInTheDocument();
  });

  it('should invoke appropriate function on close click', () => {
    mockNotificationStore.isActive = true;
    mockNotificationStore.type = 'error';

    render(<NotificationWrapper />);

    const closeBtn = screen.getByAltText('close');
    
    fireEvent.click(closeBtn);
    expect(mockNotificationStore.close).toHaveBeenCalledTimes(1);
  });
})