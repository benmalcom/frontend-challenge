import { createContext, ReactNode } from 'react';
import { Character } from 'utils/types';

type GlobalContextProps = {
  tags: string[];
  onTextFilter(text: string): void;
  onTagToggle(tagName: string): void;
  onClearTags(): void;
  isTagSelected(tagName: string): boolean;
  onRemoveTeamMember(characterId: number): void;
  onSelectTeamMember(characterId: number): void;
  isTeamMember(characterId: number): boolean;
  characters: Character[];
  teamsIds: number[];
};

type GlobalContextProvider = GlobalContextProps & {
  children: ReactNode;
};

export const GlobalContext = createContext<GlobalContextProps | null>(null);

const GlobalContextProvider = ({
  children,
  ...contextValue
}: GlobalContextProvider): JSX.Element => (
  <GlobalContext.Provider value={{ ...contextValue }}>{children}</GlobalContext.Provider>
);

export default GlobalContextProvider;
