import { render, screen, userEvent } from 'jest/test-utils';
import Tag from './Tag';

describe('<Tag />', () => {
  test('renders tag with tag name', () => {
    render(<Tag text="team" />);
    const tagText = screen.getByText(/Team/i);
    expect(tagText).toBeInTheDocument();
  });

  test('should indicate tag as clicked', async () => {
    const onClickMock = jest.fn();
    render(<Tag text="team" onClick={onClickMock} />);
    const tag = screen.getByText(/Team/i);
    expect(tag).toBeInTheDocument();
    await userEvent.click(tag);
    expect(onClickMock).toHaveBeenCalled();
  });

  test('should display check icon if selected', async () => {
    const onClickMock = jest.fn();
    const { rerender } = render(<Tag text="team" onClick={onClickMock} />);
    expect(screen.queryByTestId('check-mark')).toBeNull();
    rerender(<Tag text="team" onClick={onClickMock} selected />);
    expect(screen.queryByTestId('check-mark')).not.toBeNull();
  });
});
