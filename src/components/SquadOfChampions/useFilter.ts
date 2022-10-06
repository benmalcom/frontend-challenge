import { useMemo, useState } from 'react';
import { Character } from 'utils/types';

type FilterState = {
  text: string;
  tags: string[];
};

const useFilter = (initialFilter: FilterState, selectedTeamIds: number[]) => {
  const [filter, setFilter] = useState<FilterState>(initialFilter);

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
      filterFnsArray.unshift(({ id }: Character) => selectedTeamIds.includes(id));
    }
    return filterFnsArray;
  }, [filter, selectedTeamIds]);

  const onTextFilter = (text: string) => setFilter(state => ({ ...state, text }));

  const onTagToggle = (tagName: string) => {
    const tags = filter.tags.slice();
    if (tags.includes(tagName)) {
      const index = tags.findIndex(item => item === tagName);
      tags.splice(index, 1);
    } else {
      tags.push(tagName);
    }
    setFilter(state => ({ ...state, tags }));
  };

  const onClearTags = () => setFilter(state => ({ ...state, tags: [] }));

  const isTagSelected = (tagName: string) => filter.tags.includes(tagName);

  return { onTextFilter, onTagToggle, filter, onClearTags, isTagSelected, filterFns };
};

export default useFilter;
