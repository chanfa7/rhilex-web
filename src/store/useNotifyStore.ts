import { create } from 'zustand';

interface NotifyState {
  // Notification data (populated by useRequest in components)
  notifyData: any;
  setNotifyData: (data: any) => void;

  // useRequest control references (set by components)
  notifyRefresh: () => void;
  notifyRun: () => void;
  setNotifyRefresh: (fn: () => void) => void;
  setNotifyRun: (fn: () => void) => void;
}

const useNotifyStore = create<NotifyState>()((set) => ({
  notifyData: undefined,
  setNotifyData: (data) => set({ notifyData: data }),

  // Default no-op functions; real implementations are set by components
  notifyRefresh: () => {},
  notifyRun: () => {},
  setNotifyRefresh: (fn) => set({ notifyRefresh: fn }),
  setNotifyRun: (fn) => set({ notifyRun: fn }),
}));

export default useNotifyStore;
