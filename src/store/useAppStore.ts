import { create } from 'zustand';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import defaultSettings from '@/config/defaultSettings';

type MenuItem = {
  key: string;
  access: boolean;
  [key: string]: any;
};

interface AppState {
  // User & auth
  currentUser?: { username: string };
  settings: Partial<LayoutSettings>;
  accessMenu?: MenuItem[];
  endAuthorize?: number;
  type?: string;

  // Actions
  setInitialState: (
    state: Partial<Pick<AppState, 'currentUser' | 'settings' | 'accessMenu' | 'endAuthorize' | 'type'>>,
  ) => void;
  resetState: () => void;
}

const initialState = {
  currentUser: undefined,
  settings: defaultSettings as Partial<LayoutSettings>,
  accessMenu: [],
  endAuthorize: undefined,
  type: undefined,
};

const useAppStore = create<AppState>()((set) => ({
  ...initialState,

  setInitialState: (partial) =>
    set((state) => ({
      ...state,
      ...partial,
    })),

  resetState: () =>
    set({
      ...initialState,
      settings: defaultSettings as Partial<LayoutSettings>,
    }),
}));

export default useAppStore;
