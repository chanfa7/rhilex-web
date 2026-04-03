import { create } from 'zustand';

interface SystemState {
  // System data (populated by useRequest in components)
  systemData: any;
  setSystemData: (data: any) => void;

  // Interface data (populated by useRequest in components)
  ifaceData: any;
  setIfaceData: (data: any) => void;

  // System polling control (references set by components)
  systemRun: () => void;
  systemCancel: () => void;
  setSystemRun: (fn: () => void) => void;
  setSystemCancel: (fn: () => void) => void;

  // Common hardware flag
  isCommon: boolean;
  setCommon: (value: boolean) => void;

  // Settings active tab
  activeKey: string;
  setActiveKey: (key: string) => void;
}

const useSystemStore = create<SystemState>()((set) => ({
  systemData: undefined,
  setSystemData: (data) => set({ systemData: data }),

  ifaceData: undefined,
  setIfaceData: (data) => set({ ifaceData: data }),

  // Default no-op functions; real implementations are set by components
  systemRun: () => {},
  systemCancel: () => {},
  setSystemRun: (fn) => set({ systemRun: fn }),
  setSystemCancel: (fn) => set({ systemCancel: fn }),

  isCommon: false,
  setCommon: (value) => set({ isCommon: value }),

  activeKey: 'resource',
  setActiveKey: (key) => set({ activeKey: key }),
}));

export default useSystemStore;
