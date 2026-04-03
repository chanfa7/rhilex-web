/**
 * Compatibility shim for the UmiJS `useModel` hook.
 * Routes legacy model names to their corresponding zustand stores.
 */
import { useAppStore } from '@/store';
import { useCommonStore } from '@/store';
import { useSystemStore } from '@/store';
import { useNotifyStore } from '@/store';
import { useSchemaStore } from '@/store';

// Lazy imports for models that are hooks themselves (useUser, useNotify, etc.)
import useUser from '@/models/useUser';
import useNotify from '@/models/useNotify';
import useSchema from '@/models/useSchema';
import useSystem from '@/models/useSystem';
import useCommon from '@/models/useCommon';

type ModelName =
  | '@@initialState'
  | 'useUser'
  | 'useNotify'
  | 'useSchema'
  | 'useSystem'
  | 'useCommon';

/**
 * useModel - compatibility shim for UmiJS useModel
 *
 * Maps old UmiJS model names to zustand stores or custom hooks.
 */
export function useModel(name: '@@initialState'): {
  initialState: {
    currentUser?: { username: string };
    settings: any;
    accessMenu?: any[];
    endAuthorize?: number;
    type?: string;
  };
  setInitialState: (partial: any) => void;
};
export function useModel(name: 'useUser'): ReturnType<typeof useUser>;
export function useModel(name: 'useNotify'): ReturnType<typeof useNotify>;
export function useModel(name: 'useSchema'): ReturnType<typeof useSchema>;
export function useModel(name: 'useSystem'): ReturnType<typeof useSystem>;
export function useModel(name: 'useCommon'): ReturnType<typeof useCommon>;
export function useModel(name: ModelName): any {
  switch (name) {
    case '@@initialState': {
      const state = useAppStore();
      const { currentUser, settings, accessMenu, endAuthorize, type, setInitialState } = state;
      return {
        initialState: { currentUser, settings, accessMenu, endAuthorize, type },
        setInitialState,
      };
    }
    case 'useUser':
      return useUser();
    case 'useNotify':
      return useNotify();
    case 'useSchema':
      return useSchema();
    case 'useSystem':
      return useSystem();
    case 'useCommon':
      return useCommon();
    default:
      throw new Error(`Unknown model: ${name}`);
  }
}

export default useModel;
