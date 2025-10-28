import { createContext, useContext, useState, ReactNode } from 'react';
import { UserMode } from '@/types';

interface UserModeContextValue {
  userMode: UserMode;
  setUserMode: (mode: UserMode) => void;
  toggleUserMode: () => void;
}

const UserModeContext = createContext<UserModeContextValue | undefined>(undefined);

interface UserModeProviderProps {
  children: ReactNode;
  defaultMode?: UserMode;
}

export function UserModeProvider({ children, defaultMode = 'beginner' }: UserModeProviderProps) {
  const [userMode, setUserMode] = useState<UserMode>(defaultMode);

  const toggleUserMode = () => {
    setUserMode(prev => prev === 'beginner' ? 'expert' : 'beginner');
  };

  return (
    <UserModeContext.Provider value={{ userMode, setUserMode, toggleUserMode }}>
      {children}
    </UserModeContext.Provider>
  );
}

export function useUserMode() {
  const context = useContext(UserModeContext);

  if (context === undefined) {
    throw new Error('useUserMode must be used within a UserModeProvider');
  }

  return context;
}
