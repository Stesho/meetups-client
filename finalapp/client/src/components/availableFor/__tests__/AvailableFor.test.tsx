import { render, screen, fireEvent } from '@testing-library/react';
import AvailableFor from "../AvailableFor";
import userStore from "../../../mocks/mockUserStore";

let mockUserStore = {...userStore}; 

jest.mock('../../../context/storeContext', () => ({
  useStore: () => mockUserStore
}));

type Roles = 'EMPLOYEE' | 'CHIEF';

const AvailableForWrapper = (props: {roles: Roles[]}): JSX.Element => (
  <AvailableFor roles={props.roles}>
    <span>test</span>
  </AvailableFor>
)

describe('AvailableFor', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUserStore = {...userStore};
  });

  it('should return passed element if the user has permissible role', () => {
    mockUserStore.role = 'CHIEF';

    render(<AvailableForWrapper roles={['CHIEF']}/>);

    const span = screen.getByText('test');

    expect(span).toBeInTheDocument();
  });

  it('should return null if the user has no enough permissions', () => {
    mockUserStore.role = 'EMPLOYEE';

    render(<AvailableForWrapper roles={['CHIEF']}/>);

    const span = screen.queryByText('test');

    expect(span).not.toBeInTheDocument();
  });
});