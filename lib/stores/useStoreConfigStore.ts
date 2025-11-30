import { create } from "zustand";

interface StoreConfig {
  isShopOpen: boolean;
  isCooking: boolean;
  isHoliday: boolean;
  holidayMessage: string;
  isNoticeActive: boolean;
  noticeMessage: string;
  description: string;
  currentStatusMsg: string;
}

interface StoreConfigStore {
  config: StoreConfig | null;
  isConnected: boolean;
  error: string | null;

  // Actions
  setConfig: (config: StoreConfig) => void;
  setConnected: (connected: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  config: null,
  isConnected: false,
  error: null,
};

export const useStoreConfigStore = create<StoreConfigStore>((set) => ({
  ...initialState,

  setConfig: (config) => set({ config, error: null }),
  setConnected: (connected) => set({ isConnected: connected }),
  setError: (error) => set({ error, isConnected: false }),
  reset: () => set(initialState),
}));
