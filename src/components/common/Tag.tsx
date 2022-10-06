import { Box } from '@mui/material';

interface TagProps {
  text: string;
  onClick?: () => void;
  selected?: boolean;
}
export const Tag = ({ text, onClick, selected }: TagProps): JSX.Element => {
  return (
    <Box
      component="div"
      onClick={onClick}
      sx={{
        backgroundColor: selected ? '#217AFF' : '#FFFFFF',
        color: selected ? '#FFFFFF' : '#217AFF',
        height: '40px',
        border: '1px solid #217AFF',
        borderRadius: '20px',
        fontSize: '18px',
        display: 'inline-flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 10px',
        cursor: 'pointer',
        textTransform: 'capitalize',
      }}
    >
      {text}
    </Box>
  );
};

export default Tag;
