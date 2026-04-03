/**
 * UDP_SERVER | TCP_SERVER | COAP | HTTP | GRPC
 */
import { getIntl, getLocale } from '@/locales';

const { formatMessage } = getIntl();

export const DEFAULT_CONFIG = [
  {
    title: formatMessage({ id: 'inend.table.title.host' }),
    dataIndex: ['config', 'host'],
    required: true,
  },
  {
    title: formatMessage({ id: 'form.title.port' }),
    dataIndex: ['config', 'port'],
    valueType: 'digit',
    required: true,
    render: (port: number) => port,
  },
];
