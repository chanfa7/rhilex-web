import type { ActiveSchema } from '@/pages/DataSchema/typings';
import { getSchemaList } from '@/services/rhilex/shujumoxing';
import { useRequest } from 'ahooks';
import { useEffect, useState } from 'react';
import { useCommonStore } from '@/store';

export const defaultActiveSchema = {
  uuid: '',
  name: '',
  published: false,
};

const useSchema = () => {
  const changeTotal = useCommonStore((s) => s.changeTotal);
  const [activeSchema, setActiveSchema] = useState<ActiveSchema>(defaultActiveSchema);
  const [activeDataCenterkey, setActiveDataCenterKey] = useState<string>('');

  const {
    run,
    data: schemaList,
    refresh,
  } = useRequest(() => getSchemaList(), {
    manual: true,
  });

  useEffect(() => {
    const defaultActiveItem = schemaList?.[0];

    if (defaultActiveItem && defaultActiveItem.uuid && defaultActiveItem.name) {
      setActiveSchema({
        uuid: defaultActiveItem.uuid,
        name: defaultActiveItem.name,
        published: defaultActiveItem?.published || false,
      });
    }
    changeTotal(schemaList?.length || 0);
  }, [schemaList]);

  return {
    run,
    refresh,
    schemaList,
    activeSchema,
    setActiveSchema,
    activeDataCenterkey,
    setActiveDataCenterKey,
  };
};

export default useSchema;
