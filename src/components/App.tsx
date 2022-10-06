import { Container } from '@mui/material';
import { Header } from 'components/layout';
import Squad from 'components/Squad/Squad';
import jsonData from 'data/characters.json';
import { MAX_WIDTH } from 'utils/constants';
import type { Character } from 'utils/types';

const data: Character[] = jsonData as Character[];

function App() {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        width: '100%',
        backgroundColor: '#F5FDFF',
        maxWidth: MAX_WIDTH,
        height: '100vh',
        maxHeight: '1080px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header />
      <Squad data={data.slice(0, 200)} />
    </Container>
  );
}

export default App;
