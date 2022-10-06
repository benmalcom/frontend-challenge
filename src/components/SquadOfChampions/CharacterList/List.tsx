import { Paper, Stack, Typography } from '@mui/material';
import ListItem from 'components/SquadOfChampions/CharacterList/ListItem';
import { CharacterTableProps } from 'components/SquadOfChampions/utils';

export const CharacterList = ({
  characters,
  onSelect,
  isCharacterSelected,
}: CharacterTableProps): JSX.Element => (
  <Paper elevation={2} sx={{ padding: '5px 8px', boxSizing: 'border-box' }}>
    <Stack sx={{ width: '1080px', maxHeight: '272px', overflowY: 'auto' }}>
      {characters.length === 0 && (
        <Typography variant="body1" sx={{ fontSize: '16px' }}>
          No characters to display
        </Typography>
      )}
      {characters.map(character => {
        const isSelected = isCharacterSelected(character.id);
        return (
          <ListItem
            key={character.id}
            character={character}
            onSelect={onSelect}
            isSelected={isSelected}
          />
        );
      })}
    </Stack>
  </Paper>
);

export default CharacterList;
