import SearchIcon from '@mui/icons-material/Search';
import { Stack, Grid, Box, Input, InputAdornment, Typography } from '@mui/material';
import { Tag } from 'components/common';

interface FiltersProps {
  tags: string[];
  onTextFilter(text: string): void;
  onTagToggle(tagName: string): void;
  onClearTags(): void;
  isTagSelected(tagName: string): boolean;
}
const Filters = ({
  tags,
  onTextFilter,
  onTagToggle,
  isTagSelected,
  onClearTags,
}: FiltersProps): JSX.Element => {
  console.log('Filter rendering...');
  return (
    <Stack
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        margin: '15px auto',
        padding: '0 30px',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          margin: '30px 0',
          position: 'relative',
          height: '1px',
          width: '920px',
          zIndex: 1,
          background:
            'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 51.04%, rgba(0, 0, 0, 0) 100%)',
        }}
      >
        <Input
          placeholder="Search Characters..."
          disableUnderline
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon fontSize="medium" />
            </InputAdornment>
          }
          onChange={e => onTextFilter(e.target.value)}
          sx={{
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            transform: 'translateY(-50%)',
            height: '40px',
            width: '500px',
            color: '#555555',
            fontSize: '16px',
            border: '1px solid #777777',
            borderRadius: '4px',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            padding: '15px',
          }}
        />
      </Box>
      <Grid container alignItems="center" sx={{ width: '100%', marginTop: '25px' }} gap="15px">
        {tags.map(tagName => (
          <Tag
            key={tagName}
            text={tagName}
            onClick={() => onTagToggle(tagName)}
            selected={isTagSelected(tagName)}
          />
        ))}
        <Tag
          key="my_team"
          text="My team"
          onClick={() => onTagToggle('my_team')}
          selected={isTagSelected('my_team')}
        />
        <Typography
          onClick={onClearTags}
          variant="button"
          sx={{
            fontSize: '20px',
            textDecorationLine: 'underline',
            color: '#999999',
            textTransform: 'none',
            cursor: 'pointer',
          }}
        >
          Clear all
        </Typography>
      </Grid>
    </Stack>
  );
};

export default Filters;
