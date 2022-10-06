import { Stack } from '@mui/material';
import debounce from 'lodash.debounce';
import { useCallback, useMemo, useState } from 'react';
import Champions from 'components/Squad/Champions/Champions';
import CharacterTable from 'components/Squad/CharacterTable';
import Filters from 'components/Squad/Filters';
import { extractTagsFromCharacters } from 'components/Squad/utils';
import { Character } from 'utils/types';

interface SquadProps {
  data: Character[];
}
type FilterState = {
  text: string;
  tags: string[];
};

export const Squad = ({ data }: SquadProps): JSX.Element => {
  const [selectedSquad, setSelectedSquad] = useState<{ [key: number]: Character }>({});
  const characters = useMemo(() => data, []);

  const [filter, setFilter] = useState<FilterState>({ text: '', tags: [] });

  const allCharacterTags = useMemo(
    () => extractTagsFromCharacters(data),
    [data, extractTagsFromCharacters]
  );

  const filterFns = useMemo(() => {
    const filterFnsArray = [
      ({ name, tags }: Character) =>
        name.toLowerCase().startsWith(filter.text.toLowerCase()) ||
        tags?.some(tag => tag.tag_name.toLowerCase().includes(filter.text.toLowerCase())),

      ({ tags }: Character) => {
        // Remove my_team tag before check
        const filteredFilterTags = filter.tags.filter(tagName => tagName !== 'my_team');
        return (
          !filteredFilterTags.length ||
          tags?.some(tagItem => filteredFilterTags.includes(tagItem.tag_name.toLowerCase()))
        );
      },
    ];

    // Check if my team tag is selected;
    const isMyTeamTagSelected = filter.tags.includes('my_team');
    if (isMyTeamTagSelected) {
      const currentTeamIds = Object.keys(selectedSquad);
      filterFnsArray.unshift(({ id }: Character) => currentTeamIds.includes(String(id)));
    }
    return filterFnsArray;
  }, [filter, selectedSquad]);

  const filteredCharacters = characters.filter(item => filterFns.every(fn => fn(item)));

  const handleTextFilter = (text: string) => setFilter(state => ({ ...state, text }));
  const debouncedHandleTextFilter = useCallback(debounce(handleTextFilter, 300), []);

  const handleTagToggle = (tagName: string) => {
    const tags = filter.tags.slice();
    if (tags.includes(tagName)) {
      const index = tags.findIndex(item => item === tagName);
      tags.splice(index, 1);
    } else {
      tags.push(tagName);
    }
    setFilter(state => ({ ...state, tags }));
  };

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
  const isTagSelected = (tagName: string) => filter.tags.includes(tagName);
  const onClearTags = () => setFilter(state => ({ ...state, tags: [] }));
  const hasSelectedSquad = Object.values(selectedSquad).length > 0;

  return (
    <Stack sx={{ flex: 1, overflowY: 'scroll' }}>
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

export default Squad;
