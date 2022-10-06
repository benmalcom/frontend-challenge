import { Character, CharacterAbility } from 'utils/types';

export interface CharacterTableProps {
  onSelect(character: Character): void;
  isCharacterSelected(id: number): boolean;
  characters: Character[];
}

export const extractTagsFromCharacters = (items: Character[]) =>
  items.reduce((acc: string[], current) => {
    current.tags?.forEach(tag => {
      if (!acc.includes(tag.tag_name)) acc.push(tag.tag_name);
    });
    return acc;
  }, []);

export const sortAbilityValues = (items: CharacterAbility[]) => {
  const groupedAbilities = items.reduce((acc: { [key: string]: CharacterAbility }, current) => {
    acc[current.abilityName as string] = current;
    return acc;
  }, {});

  const result = [];
  result.push(
    groupedAbilities.Power,
    groupedAbilities.Mobility,
    groupedAbilities.Technique,
    groupedAbilities.Survivability,
    groupedAbilities.Energy
  );
  return result;
};

export const characterTableColumns = {
  Character: {
    props: {
      sx: { width: '26%' },
    },
  },
  Tags: {
    props: {
      sx: { width: '20%' },
    },
  },
  Power: {
    props: {
      sx: { width: '57px', display: 'flex', justifyContent: 'end' },
    },
  },
  Mobility: {
    props: {
      sx: { width: '73px', display: 'flex', justifyContent: 'end' },
    },
  },
  Technique: {
    props: {
      sx: { width: '94px', display: 'flex', justifyContent: 'end' },
    },
  },
  Survivability: {
    props: {
      sx: { width: '112px', display: 'flex', justifyContent: 'end' },
    },
  },
  Energy: {
    props: {
      sx: { width: '62px', display: 'flex', justifyContent: 'end' },
    },
  },
};
