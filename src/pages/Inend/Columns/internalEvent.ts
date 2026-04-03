import { getIntl, getLocale } from '@/locales';
import { eventTypeOption } from '../enum';

const { formatMessage } = getIntl();

export const INTERNAL_EVENT = [
  {
    title: formatMessage({ id: 'inend.table.title.eventType' }),
    dataIndex: ['config', 'type'],
    valueType: 'select',
    required: true,
    valueEnum: eventTypeOption,
  },
];
