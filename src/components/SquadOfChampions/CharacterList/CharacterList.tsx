import { Paper, Stack, Typography } from '@mui/material';
import { Virtuoso } from 'react-virtuoso';
import ListItem from 'components/SquadOfChampions/CharacterList/CharacterListItem';
import { CharacterTableProps } from 'components/SquadOfChampions/utils';

const getHeightMultiplier = (count: number) => {
  if (count >= 3) return 3;
  else if (count < 3 && count > 0) return count;
  else return 1;
};
export const CharacterList = ({
  characters,
  isTeamMember,
  onSelect,
  isTeamComplete,
}: CharacterTableProps): JSX.Element => {
  const multiplier = getHeightMultiplier(characters.length);
  return (
    <Paper elevation={2} sx={{ padding: '5px 8px', boxSizing: 'border-box' }}>
      <Stack sx={{ width: 'fit-content' }}>
        {characters.length === 0 && (
          <Typography variant="body1" sx={{ fontSize: '16px' }}>
            No characters to display
          </Typography>
        )}
        <Virtuoso
          style={{ height: `calc(${multiplier} * 92px)`, maxHeight: '272px', width: '1080px' }}
          totalCount={characters.length}
          itemContent={(index: number) => {
            const character = characters[index];

            return (
              <ListItem
                key={character.id}
                character={character}
                isSelected={isTeamMember(character.id)}
                onSelect={onSelect}
                isTeamComplete={isTeamComplete}
              />
            );
          }}
        />
      </Stack>
    </Paper>
  );
};

export default CharacterList;
