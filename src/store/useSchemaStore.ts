import { create } from 'zustand';

interface SchemaState {
  // Schema list (populated by useRequest in components)
  schemaList: any[];
  setSchemaList: (list: any[]) => void;

  // useRequest control references (set by components)
  schemaRun: () => void;
  schemaRefresh: () => void;
  setSchemaRun: (fn: () => void) => void;
  setSchemaRefresh: (fn: () => void) => void;

  // Active schema
  activeSchema: any;
  setActiveSchema: (schema: any) => void;

  // Active data center key
  activeDataCenterkey: string;
  setActiveDataCenterKey: (key: string) => void;
}

export const defaultActiveSchema = {
  uuid: '',
  name: '',
  published: false,
};

const useSchemaStore = create<SchemaState>()((set) => ({
  schemaList: [],
  setSchemaList: (list) => set({ schemaList: list }),

  // Default no-op functions; real implementations are set by components
  schemaRun: () => {},
  schemaRefresh: () => {},
  setSchemaRun: (fn) => set({ schemaRun: fn }),
  setSchemaRefresh: (fn) => set({ schemaRefresh: fn }),

  activeSchema: defaultActiveSchema,
  setActiveSchema: (schema) => set({ activeSchema: schema }),

  activeDataCenterkey: '',
  setActiveDataCenterKey: (key) => set({ activeDataCenterkey: key }),
}));

export default useSchemaStore;
