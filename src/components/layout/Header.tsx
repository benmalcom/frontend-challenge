import { Box } from '@mui/material';

export const Header = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        height: '76px',
        width: '100%',
        position: 'relative',
        marginBottom: '71px',
      }}
    >
      <Box
        sx={{
          height: '90px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '-45px',
        }}
      >
        <img src="img/Mortal-Kombat-Logo.png" alt="Mortal kombat logo" height="100%" />
      </Box>
    </Box>
  );
};

export default Header;
