import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ConfigProvider, App } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { IntlProvider } from 'react-intl';
import PopupHack from '@/components/PopupHack';
import { router } from '@/router';
import { getLocale, getMessages } from '@/locales';
import '@/tailwind.css';
import '@/global.less';
import '@/overrides.less';
import 'dayjs/locale/zh-cn';
import 'mac-scrollbar/dist/mac-scrollbar.css';

const theme = {
  token: {
    colorPrimary: '#1677ff',
    borderRadius: 2,
    wireframe: true,
  },
};

const locale = getLocale();
const messages = getMessages(locale);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ConfigProvider theme={theme} locale={zhCN}>
        <IntlProvider locale={locale} messages={messages} defaultLocale="zh-CN">
          <App>
            <RouterProvider router={router} />
            <PopupHack />
          </App>
        </IntlProvider>
      </ConfigProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
