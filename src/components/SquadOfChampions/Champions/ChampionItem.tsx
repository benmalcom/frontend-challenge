import styled from '@emotion/styled/macro';
import { Typography, Avatar, Box } from '@mui/material';
import { Character } from 'utils/types';

const StyledOverlay = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  zIndex: 1,
  position: 'absolute',
  background: 'linear-gradient(0deg, rgba(33, 122, 255, 0.6), rgba(33, 122, 255, 0.6))',
  borderRadius: '40px',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
}));

interface ChampionItemProps {
  onRemove(id: number): void;
  character: Character;
}

export const ChampionItem = ({ onRemove, character }: ChampionItemProps): JSX.Element => (
  <Box
    sx={{
      border: '1px solid #217AFF',
      display: 'inline-block',
      position: 'relative',
      borderRadius: '40px',
      width: '80px',
      height: '80px',
      '&:hover': {
        cursor: 'pointer',
        [`${StyledOverlay}`]: {
          display: 'flex',
        },
      },
    }}
  >
    <StyledOverlay>
      <Typography
        variant="button"
        sx={{ fontSize: '14px', color: '#FFFFFF', textTransform: 'capitalize' }}
        onClick={() => onRemove(character.id)}
      >
        Remove
      </Typography>
    </StyledOverlay>
    <Avatar alt="Remy Sharp" src={character.image} sx={{ width: '100%', height: '100%' }} />
  </Box>
);

export default ChampionItem;
