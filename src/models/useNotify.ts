import { getNotifyPageList } from '@/services/rhilex/zhanneitongzhi';
import { useRequest } from 'ahooks';

const useNotify = () => {
  const { run, data, refresh } = useRequest(() => getNotifyPageList({ current: 1, size: 3 }), {
    manual: true,
  });

  return {
    run,
    data,
    refresh,
  };
};

export default useNotify;
