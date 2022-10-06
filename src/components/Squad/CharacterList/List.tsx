import { Avatar, Checkbox, Grid, Paper, Stack, Typography } from '@mui/material';
import { Tag } from 'components/common';
import {
  characterTableColumns,
  CharacterTableProps,
  sortAbilityValues,
} from 'components/Squad/utils';

export const CharacterList = ({
  characters,
  onSelect,
  isCharacterSelected,
}: CharacterTableProps): JSX.Element => (
  <Paper elevation={2}>
    <Stack sx={{ width: '1080px', maxHeight: '272px', overflowY: 'auto' }}>
      {characters.map(character => {
        const isSelected = isCharacterSelected(character.id);
        return (
          <Grid
            key={character.id}
            container
            sx={{ width: '100%', backgroundColor: isSelected ? '#EDF5FF' : 'transparent' }}
            columnGap="26px"
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              sx={{
                height: '92px',
                padding: '0 10px',
                ...characterTableColumns.Character.props.sx,
              }}
              columnGap="15px"
            >
              <Checkbox
                checked={isSelected}
                onChange={() => onSelect(character)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              <Avatar alt={character.name} src={character.thumbnail} />
              <Typography variant="subtitle2" sx={{ fontSize: '20px', fontWeight: 700 }}>
                {character.name}
              </Typography>
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              sx={{ height: '92px', ...characterTableColumns.Tags.props.sx }}
              columnGap="6px"
            >
              {character?.tags?.map(tag => (
                <Tag key={tag.tag_name} text={tag.tag_name} />
              ))}
            </Grid>
            {sortAbilityValues(character.abilities).map(ability => (
              <Grid
                key={ability.abilityName}
                item
                sx={{
                  height: '92px',
                  ...characterTableColumns[ability.abilityName].props.sx,
                  justifyContent: 'center',
                }}
                alignItems="center"
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: ability.abilityScore === 10 ? '#FF0000' : '#000000',
                  }}
                >
                  {ability.abilityScore}
                </Typography>
              </Grid>
            ))}
          </Grid>
        );
      })}
    </Stack>
  </Paper>
);
