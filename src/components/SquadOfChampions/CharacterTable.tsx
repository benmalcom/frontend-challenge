import { Stack, Typography, Grid } from '@mui/material';
import { CharacterList } from 'components/SquadOfChampions/CharacterList';
import { characterTableColumns, CharacterTableProps } from 'components/SquadOfChampions/utils';

const CharacterListHeader = () => (
  <Grid container sx={{ width: '1080px', marginBottom: '10px' }} columnGap="26px">
    {Object.entries(characterTableColumns).map(([headerName, column], index) => (
      <Grid item key={index} {...column.props}>
        <Typography variant="subtitle2" sx={{ fontSize: '20px', fontWeight: 700 }}>
          {headerName}
        </Typography>
      </Grid>
    ))}
  </Grid>
);

export const CharacterTable = ({
  characters,
  onSelect,
  isCharacterSelected,
}: CharacterTableProps): JSX.Element => {
  return (
    <Stack
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginTop: '25px',
      }}
    >
      <CharacterListHeader />
      <CharacterList
        characters={characters}
        onSelect={onSelect}
        isCharacterSelected={isCharacterSelected}
      />
    </Stack>
  );
};

export default CharacterTable;
