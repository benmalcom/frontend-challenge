import { Stack } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';
import Champions from 'components/SquadOfChampions/Champions/Champions';
import CharacterTable from 'components/SquadOfChampions/CharacterTable';
import Filters from 'components/SquadOfChampions/Filters';
import useFilter from 'components/SquadOfChampions/useFilter';
import { extractTagsFromCharacters } from 'components/SquadOfChampions/utils';
import { Character } from 'utils/types';

interface SquadProps {
  data: Character[];
}

export const SquadOfChampions = ({ data }: SquadProps): JSX.Element => {
  const [selectedSquad, setSelectedSquad] = useState<{ [key: number]: Character }>({});
  const characters = useMemo(() => data, []);

  const { filterFns, onTextFilter, onTagFilter, onClearTags, isTagSelected } = useFilter(
    { text: '', tags: [] },
    Object.keys(selectedSquad)
  );

  const allCharacterTags = useMemo(
    () => extractTagsFromCharacters(data),
    [data, extractTagsFromCharacters]
  );

  const filteredCharacters = characters.filter(item => filterFns.every(fn => fn(item)));
  const handleTextFilter = (text: string) => onTextFilter(text);
  const debouncedHandleTextFilter = useCallback(debounce(handleTextFilter, 300), []);
  const handleTagToggle = (tagName: string) => onTagFilter(tagName);

  const handleCharacterToggle = (item: Character) => {
    const selectedCopy = { ...selectedSquad };
    if (selectedCopy[item.id]) {
      delete selectedCopy[item.id];
    } else {
      if (Object.values(selectedCopy).length >= 6) return;
      selectedCopy[item.id] = item;
    }
    setSelectedSquad(selectedCopy);
  };

  const handleTeamMemberRemove = (id: number) =>
    setSelectedSquad(selected => {
      const selectedCopy = { ...selected };
      delete selectedCopy[id];
      return selectedCopy;
    });

  const isCharacterSelected = (id: number) => !!selectedSquad[id];
  const hasSelectedSquad = Object.values(selectedSquad).length > 0;

  return (
    <Stack sx={{ flex: 1, overflowY: 'auto' }}>
      {hasSelectedSquad && (
        <Champions characters={Object.values(selectedSquad)} onRemove={handleTeamMemberRemove} />
      )}
      <Filters
        onClearTags={onClearTags}
        tags={allCharacterTags}
        onTextFilter={debouncedHandleTextFilter}
        onTagsFilter={handleTagToggle}
        isTagSelected={isTagSelected}
      />
      <CharacterTable
        onSelect={handleCharacterToggle}
        characters={filteredCharacters}
        isCharacterSelected={isCharacterSelected}
      />
    </Stack>
  );
};

export default SquadOfChampions;
