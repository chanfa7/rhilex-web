import { create } from 'zustand';

interface DetailConfig {
  open: boolean;
  uuid: string;
}

const defaultConfig: DetailConfig = {
  uuid: '',
  open: false,
};

interface CommonState {
  // Detail modal config
  detailConfig: DetailConfig;
  changeConfig: (value: DetailConfig) => void;
  initialConfig: () => void;

  // Schema total
  total: number;
  changeTotal: (value: number) => void;

  // Free trial flag
  isFreeTrial: boolean;
  setFreeTrial: (value: boolean) => void;
}

const useCommonStore = create<CommonState>()((set) => ({
  detailConfig: defaultConfig,
  changeConfig: (value) => set({ detailConfig: value }),
  initialConfig: () => set({ detailConfig: defaultConfig }),

  total: 0,
  changeTotal: (value) => set({ total: value }),

  isFreeTrial: true,
  setFreeTrial: (value) => set({ isFreeTrial: value }),
}));

export default useCommonStore;
