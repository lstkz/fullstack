import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { User } from 'shared';
import { clearAccessToken } from 'src/services/Storage';
import { useImmer } from 'use-immer';

interface Actions {
  setUser: (user: User) => void;
  updateEmail: (email: string) => void;
  logout: () => void;
}

interface State {
  user: User | null | undefined;
}

const AuthModuleContext = React.createContext<{
  state: State;
  actions: Actions;
}>(null!);

export interface AuthModuleProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export function AuthModule(props: AuthModuleProps) {
  const { children, initialUser } = props;
  const [state, setState] = useImmer<State>({ user: initialUser });
  const router = useRouter();

  const actions = React.useMemo<Actions>(
    () => ({
      setUser: user =>
        setState(draft => {
          draft.user = user;
        }),
      updateEmail: email =>
        setState(draft => {
          draft.user!.email = email;
        }),

      logout: async () => {
        clearAccessToken();
        await router.push('/login');
      },
    }),
    []
  );

  return (
    <AuthModuleContext.Provider
      value={{
        state,
        actions,
      }}
    >
      {children}
    </AuthModuleContext.Provider>
  );
}

export function useAuthActions() {
  return React.useContext(AuthModuleContext).actions;
}

export function useUser() {
  return React.useContext(AuthModuleContext).state.user;
}
