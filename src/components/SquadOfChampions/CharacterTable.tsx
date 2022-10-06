import { Stack, Typography, Grid } from '@mui/material';
import { CharacterList } from 'components/SquadOfChampions/CharacterList';
import { characterTableColumns, CharacterTableProps } from 'components/SquadOfChampions/utils';

const CharacterListHeader = () => (
  <Grid container sx={{ width: '1080px', marginBottom: '10px', marginTop: '5px' }} columnGap="26px">
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
  isTeamMember,
  isTeamComplete,
}: CharacterTableProps): JSX.Element => {
  return (
    <>
      <Stack
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginTop: '25px',
        }}
      >
        {' '}
        {isTeamComplete && (
          <Typography
            variant="h6"
            sx={{
              fontSize: '15px',
              fontWeight: 400,
              color: 'red',
            }}
            gutterBottom
          >
            Reached maximum selection!{' '}
          </Typography>
        )}
        <CharacterListHeader />
        <CharacterList
          characters={characters}
          onSelect={onSelect}
          isTeamMember={isTeamMember}
          isTeamComplete={isTeamComplete}
        />
      </Stack>
    </>
  );
};

export default CharacterTable;
