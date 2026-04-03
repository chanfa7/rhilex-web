import JsonCode from '@/components/JsonCode';
import { getSettingsNetStatus } from '@/services/rhilex/wangluopeizhi';
import { ProCard } from '@ant-design/pro-components';
import { useIntl } from 'react-intl';
import { useRequest } from 'ahooks';

const NetworkStatus = () => {
  const { formatMessage } = useIntl();

  const { data } = useRequest(() => getSettingsNetStatus());

  return (
    <ProCard title={formatMessage({ id: 'system.tab.netStatus' })} headStyle={{ paddingBlock: 0 }}>
      <JsonCode code={data} />
    </ProCard>
  );
};

export default NetworkStatus;
