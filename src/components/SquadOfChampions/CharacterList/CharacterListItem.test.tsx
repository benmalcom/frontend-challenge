import characters from 'data/characters.json';
import { render, screen } from 'jest/test-utils';
import { Character } from 'utils/types';
import CharacterListItem from './CharacterListItem';
const testData = characters[0] as Character;

describe('<CharacterListItem />', () => {
  test('renders with without crash', () => {
    const onSelectMock = jest.fn();
    render(<CharacterListItem character={testData} onSelect={onSelectMock} />);
    expect(screen.getByText(/Baraka/i)).toBeInTheDocument();
    expect(screen.getByText(/monster/i)).toBeInTheDocument();
    expect(screen.getByText(/melee/i)).toBeInTheDocument();
  });
});
