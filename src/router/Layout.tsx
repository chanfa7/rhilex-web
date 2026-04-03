import { Suspense, useCallback, useMemo } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { ProLayout } from '@ant-design/pro-components';
import type { ProLayoutProps } from '@ant-design/pro-components';
import { DefaultFooter } from '@ant-design/pro-components';
import { MacScrollbar } from 'mac-scrollbar';
import 'mac-scrollbar/dist/mac-scrollbar.css';
import { useIntl } from 'react-intl';

import RightContent from '@/components/RightContent';
import { GoBackModal } from '@/components/ProPageContainer';
import useAppStore from '@/store/useAppStore';
import defaultSettings from '@/config/defaultSettings';

import { routeMenuData, RouteConfig } from './routeConfig';

/** 递归翻译菜单名称 */
const translateMenu = (
  routes: RouteConfig[],
  formatMessage: (descriptor: { id: string }) => string,
): RouteConfig[] =>
  routes.map((route) => ({
    ...route,
    name: route.name ? formatMessage({ id: route.name }) : route.name,
    routes: route.routes ? translateMenu(route.routes, formatMessage) : undefined,
  }));

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formatMessage } = useIntl();
  const { accessMenu, settings } = useAppStore();

  const mergedSettings = useMemo(() => {
    return { ...defaultSettings, ...settings } as ProLayoutProps;
  }, [settings]);

  // 预翻译菜单名称
  const translatedMenuData = useMemo(
    () => translateMenu(routeMenuData, formatMessage),
    [formatMessage],
  );

  // Access-controlled menu rendering
  const menuDataRender = useCallback(
    (menuData: any[]) => {
      if (!accessMenu || accessMenu.length === 0) return menuData;

      return menuData?.map((menu) => {
        const accessItem = accessMenu?.find((item) => item.key === menu.key);
        if (accessItem) {
          return {
            ...menu,
            hideInMenu: !accessItem?.access,
          };
        }
        return menu;
      });
    },
    [accessMenu],
  );

  // Breadcrumb item render
  const itemRender = useCallback(
    (route: any, _: any, routes: any, paths: any) => {
      if (!route['component']) return <span>{route.breadcrumbName || route.name}</span>;
      const last = routes.indexOf(route) === routes.length - 1;
      return last ? (
        <span>{route.breadcrumbName || route.name}</span>
      ) : (
        <Link to={`/${paths[paths.length - 1]}`}>{route.breadcrumbName || route.name}</Link>
      );
    },
    [],
  );

  // Menu item click handler
  const menuItemRender = useCallback(
    (item: any, defaultDom: React.ReactNode) => {
      const currentPath = window.location?.pathname;
      const regex = /(?:inend|outend|app|device\/[^/]+)\/(?:new|edit)[^/]*/;

      if (
        regex.test(currentPath) ||
        currentPath.includes('/rule/new') ||
        currentPath.includes('/rule/edit')
      ) {
        return (
          <a
            onClick={() => {
              GoBackModal(item?.path || '/');
            }}
          >
            {defaultDom}
          </a>
        );
      } else {
        return (
          <a onClick={() => navigate(item?.path || '/')}>
            {defaultDom}
          </a>
        );
      }
    },
    [navigate],
  );

  // Page change handler: check access control
  const onPageChange = useCallback(() => {
    const activePathname = location?.pathname?.split('/')[1];
    const activeMenu = accessMenu?.find((menu) => menu.key === activePathname);

    if (activeMenu && !activeMenu?.access) {
      navigate('/403');
    }
  }, [location?.pathname, accessMenu, navigate]);

  return (
    <ProLayout
      {...mergedSettings}
      siderWidth={208}
      route={{ routes: translatedMenuData }}
      location={{ pathname: location.pathname }}
      rightContentRender={() => <RightContent />}
      onPageChange={onPageChange}
      itemRender={itemRender}
      footerRender={() => (
        <DefaultFooter
          copyright={`2023-${new Date().getFullYear()} RHILEX Technologies Inc. All rights reserved.`}
        />
      )}
      menuHeaderRender={undefined}
      menuDataRender={menuDataRender}
      menuItemRender={menuItemRender}
      className="h-[100vh] rhilex-layout"
    >
      <MacScrollbar>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </MacScrollbar>
    </ProLayout>
  );
};

export default Layout;
