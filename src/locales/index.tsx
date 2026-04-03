import { Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useIntl as useReactIntl, FormattedMessage } from 'react-intl';

// ---------------------------------------------------------------------------
// Locale messages
// ---------------------------------------------------------------------------
import zhCN from './zh-CN';
import enUS from './en-US';
import zhTW from './zh-TW';

export const localesMap: Record<string, { messages: Record<string, string>; label: string }> = {
  'zh-CN': { messages: zhCN, label: '简体中文' },
  'en-US': { messages: enUS, label: 'English' },
  'zh-TW': { messages: zhTW, label: '繁體中文' },
};

const LOCALE_KEY = 'rhilex_locale';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get the currently stored locale, defaulting to zh-CN */
export function getLocale(): string {
  const stored = localStorage.getItem(LOCALE_KEY);
  if (stored && localesMap[stored]) return stored;
  return 'zh-CN';
}

/** Persist locale preference */
export function setLocale(locale: string): void {
  if (localesMap[locale]) {
    localStorage.setItem(LOCALE_KEY, locale);
    // Full reload to pick up the new IntlProvider messages
    window.location.reload();
  }
}

/** Get messages object for a given locale */
export function getMessages(locale: string): Record<string, string> {
  return localesMap[locale]?.messages ?? localesMap['zh-CN'].messages;
}

// ---------------------------------------------------------------------------
// SelectLang component (language switcher dropdown)
// ---------------------------------------------------------------------------

interface SelectLangProps {
  className?: string;
}

export const SelectLang: React.FC<SelectLangProps> = ({ className }) => {
  const currentLocale = getLocale();

  const items = Object.entries(localesMap).map(([key, { label }]) => ({
    key,
    label,
    disabled: key === currentLocale,
  }));

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => setLocale(key),
        selectedKeys: [currentLocale],
      }}
    >
      <span className={className}>
        <GlobalOutlined style={{ color: '#fff', fontSize: 16, verticalAlign: 'middle' }} />
      </span>
    </Dropdown>
  );
};

// ---------------------------------------------------------------------------
// Re-exports from react-intl for convenience
// ---------------------------------------------------------------------------
export { useReactIntl as useIntl, FormattedMessage };

/** Get intl instance for imperative use (mirrors UmiJS getIntl) */
export function getIntl() {
  // Return a simple wrapper for formatMessage using current locale messages
  const locale = getLocale();
  const msgs = getMessages(locale);
  return {
    formatMessage: ({ id }: { id: string }, values?: Record<string, any>) => {
      let msg = msgs[id] || id;
      if (values) {
        Object.entries(values).forEach(([k, v]) => {
          msg = msg.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
        });
      }
      return msg;
    },
  };
}
