import { Avatar, Checkbox, Grid, Typography } from '@mui/material';
import { Tag } from 'components/common';
import { characterTableColumns, sortAbilityValues } from 'components/SquadOfChampions/utils';
import { Character } from 'utils/types';

type ListItemProps = {
  character: Character;
  onSelect(character: Character): void;
  isSelected: boolean;
};

export const ListItem = ({ character, onSelect, isSelected }: ListItemProps): JSX.Element => (
  <Grid
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

export default ListItem;
