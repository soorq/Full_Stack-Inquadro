import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { StateCreator, create } from 'zustand';
import { createSelectors } from '../lib/zustand';
import type { Session } from './session.types';

type State = {
    session: Session | null;
    step: string;
};

type Actions = {
    setSession: (session: Session) => void;
    resetSession: () => void;
    setStep: (step: string) => void;
};

function createSessionSlice() {
    const sessionSlice: StateCreator<
        State & Actions,
        [['zustand/devtools', never], ['zustand/persist', unknown]],
        [],
        State & Actions
    > = set => ({
        session: null,
        step: 'email',
        setStep: step => set({ step }, false, 'setStep'),
        setSession: (session: Session) => set({ session }, false, 'setSession'),
        resetSession: () => set({ session: null }, false, 'resetSession')
    });
    return sessionSlice;
}

const slice = createSessionSlice();
const withPersist = persist(slice, {
    name: 'session',
    storage: createJSONStorage(() => localStorage)
});
const withDevtools = devtools(withPersist, { name: 'Session Service' });
const store = create(withDevtools);
export const useSessionStore = createSelectors(store);
