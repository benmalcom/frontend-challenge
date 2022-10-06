import { Stack } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';
import GlobalContextProvider from 'components/GlobalContext';
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
  const [teamsIds, setTeamIds] = useState<number[]>([]);
  const characters = useMemo(() => data, [data]);

  const { filterFns, onTextFilter, onTagToggle, onClearTags, isTagSelected } = useFilter(
    { text: '', tags: [] },
    teamsIds
  );

  const allCharacterTags = useMemo(() => extractTagsFromCharacters(data), [data]);

  const filteredCharacters = useMemo(
    () => characters.filter(item => filterFns.every(fn => fn(item))),
    [characters, filterFns]
  );
  const handleTextFilter = debounce((text: string) => onTextFilter(text), 300);
  const handleTagToggle = (tagName: string) => onTagToggle(tagName);

  const handleCharacterToggle = useCallback(
    (id: number) => {
      const selectedCopy = [...teamsIds];
      if (selectedCopy.includes(id)) {
        const index = selectedCopy.indexOf(id);
        selectedCopy.splice(index, 1);
      } else {
        if (selectedCopy.length >= 6) return;
        selectedCopy.push(id);
      }
      setTeamIds(selectedCopy);
    },
    [teamsIds]
  );

  const handleTeamMemberRemove = (id: number) =>
    setTeamIds(selected => selected.filter(item => item !== id));

  const isTeamMember = useCallback((id: number) => teamsIds.includes(id), [teamsIds]);
  const hasSelectedSquad = teamsIds.length > 0;

  return (
    <GlobalContextProvider
      characters={characters}
      tags={allCharacterTags}
      isTagSelected={isTagSelected}
      isTeamMember={isTeamMember}
      onRemoveTeamMember={handleTeamMemberRemove}
      onSelectTeamMember={handleCharacterToggle}
      onClearTags={onClearTags}
      onTagToggle={onTagToggle}
      onTextFilter={onTextFilter}
      teamsIds={teamsIds}
    >
      <Stack sx={{ flex: 1, overflowY: 'auto' }}>
        {hasSelectedSquad && (
          <Champions
            characters={characters.filter(character => teamsIds.includes(character.id))}
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
          isTeamMember={isTeamMember}
        />
      </Stack>
    </GlobalContextProvider>
  );
};

export default SquadOfChampions;
