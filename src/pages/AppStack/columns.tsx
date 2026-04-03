import ProSegmented from '@/components/ProSegmented';
import ProTag, { StatusType } from '@/components/ProTag';
import { getIntl, getLocale } from '@/locales';

export const baseColumns = [
  {
    title: getIntl().formatMessage({ id: 'table.title.name' }),
    dataIndex: 'name',
    ellipsis: true,
    required: true,
  },
  {
    title: getIntl().formatMessage({ id: 'appStack.table.title.version' }),
    dataIndex: 'version',
    required: true,
  },
  {
    title: getIntl().formatMessage({ id: 'table.title.status' }),
    dataIndex: 'appState',
    hideInForm: true,
    renderText: (appState: number) => <ProTag type={StatusType.APP}>{appState}</ProTag>,
  },
  {
    title: getIntl().formatMessage({ id: 'appStack.table.title.autoStart' }),
    dataIndex: 'autoStart',
    required: true,
    convertValue: (value: boolean) => value?.toString(),
    transform: (value: string) => ({ autoStart: value === 'true' ? true : false }),
    renderFormItem: () => <ProSegmented />,
    renderText: (autoStart: boolean) => <ProTag type={StatusType.BOOL}>{autoStart}</ProTag>,
  },
  {
    title: getIntl().formatMessage({ id: 'appStack.table.title.type' }),
    dataIndex: 'type',
    valueType: 'select',
    valueEnum: {
      lua: getIntl().formatMessage({ id: 'appStack.table.title.type.valueEnum' }),
    },
    hideInTable: true,
    hideInForm: true,
  },
  {
    title: getIntl().formatMessage({ id: 'appStack.table.title.luaSource' }),
    dataIndex: 'luaSource',
    valueType: 'code',
    hideInTable: true,
    hideInForm: true,
  },
  {
    title: getIntl().formatMessage({ id: 'table.title.desc' }),
    dataIndex: 'description',
    ellipsis: true,
    renderText: (description: string) => description || '-',
  },
];
