import { Container, Stack } from '@mui/material';
import { Header } from 'components/layout';
import SquadOfChampions from 'components/SquadOfChampions/SquadOfChampions';
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
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        overflowY: 'scroll',
      }}
    >
      <Stack
        sx={{
          width: '100%',
          backgroundColor: '#F5FDFF',
          maxWidth: MAX_WIDTH,
          height: '100%',
          maxHeight: '1080px',
        }}
      >
        <Header />
        <SquadOfChampions data={data} />
      </Stack>
    </Container>
  );
}

export default App;
