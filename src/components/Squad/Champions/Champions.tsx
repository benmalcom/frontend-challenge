import { Stack, Typography, Grid } from '@mui/material';
import ChampionItem from 'components/Squad/Champions/ChampionItem';
import { sortAbilityValues } from 'components/Squad/utils';
import { Character } from 'utils/types';

interface ChampionsProps {
  onRemove(id: number): void;
  characters: Character[];
}
export const Champions = ({ characters, onRemove }: ChampionsProps): JSX.Element => {
  const avg = characters.reduce((acc: { [key: string]: number }, current) => {
    const abilities = sortAbilityValues(current.abilities);
    abilities.forEach(({ abilityName, abilityScore }) => {
      acc[abilityName] = (acc[abilityName] ?? 0) + abilityScore;
    });
    return acc;
  }, {});
  return (
    <Stack alignItems="center">
      <Typography variant="h6" component="h6" sx={{ fontSize: '24px' }}>
        Your champions!
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        columnGap="11px"
        sx={{ margin: '15px 0' }}
      >
        {characters.map(character => (
          <ChampionItem key={character.id} onRemove={onRemove} character={character} />
        ))}
      </Grid>
      <Stack sx={{ width: 'fit-content' }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          columnGap="11px"
          sx={{ height: '100px' }}
        >
          {Object.entries(avg).map(([abilityName, avgAbilityScore]) => {
            const isTechnique = abilityName === 'Technique';
            const extraStyles = isTechnique
              ? { borderLeft: '1px solid #000000', borderRight: '1px solid #000000' }
              : null;
            return (
              <Grid item key={abilityName} sx={{ padding: '16px', height: '100%', ...extraStyles }}>
                <Typography variant="body1" gutterBottom sx={{ fontSize: '16px' }}>
                  {abilityName}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: '24px', fontWeight: 700, textAlign: 'center' }}
                  gutterBottom
                >
                  {Number(avgAbilityScore / characters.length).toFixed(2)}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
        <Typography
          variant="h6"
          sx={{
            fontSize: '12px',
            fontWeight: 400,
            color: '#666666',
          }}
          gutterBottom
        >
          * Totals as average for squad
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Champions;
