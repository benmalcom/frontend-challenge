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
  const [selectedSquad, setSelectedSquad] = useState<number[]>([]);
  const characters = useMemo(() => data, [data]);

  const { filterFns, onTextFilter, onTagFilter, onClearTags, isTagSelected } = useFilter(
    { text: '', tags: [] },
    selectedSquad
  );

  const allCharacterTags = useMemo(() => extractTagsFromCharacters(data), [data]);

  const filteredCharacters = useMemo(
    () => characters.filter(item => filterFns.every(fn => fn(item))),
    [characters, filterFns]
  );
  const handleTextFilter = debounce((text: string) => onTextFilter(text), 300);
  const handleTagToggle = (tagName: string) => onTagFilter(tagName);

  const handleCharacterToggle = useCallback(
    (id: number) => {
      const selectedCopy = [...selectedSquad];
      if (selectedCopy.includes(id)) {
        const index = selectedCopy.indexOf(id);
        selectedCopy.splice(index, 1);
      } else {
        if (selectedCopy.length >= 6) return;
        selectedCopy.push(id);
      }
      setSelectedSquad(selectedCopy);
    },
    [selectedSquad]
  );

  const handleTeamMemberRemove = (id: number) =>
    setSelectedSquad(selected => selected.filter(item => item !== id));

  const isCharacterSelected = useCallback(
    (id: number) => selectedSquad.includes(id),
    [selectedSquad]
  );
  const hasSelectedSquad = selectedSquad.length > 0;

  return (
    <Stack sx={{ flex: 1, overflowY: 'auto' }}>
      {hasSelectedSquad && (
        <Champions
          characters={characters.filter(character => selectedSquad.includes(character.id))}
          onRemove={handleTeamMemberRemove}
        />
      )}
      <Filters
        onClearTags={onClearTags}
        tags={allCharacterTags}
        onTextFilter={handleTextFilter}
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
