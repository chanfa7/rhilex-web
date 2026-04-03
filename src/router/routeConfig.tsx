/**
 * Route configuration data extracted from the original config/routes.ts
 * Used by both ProLayout (for menu rendering) and react-router-dom (for route matching).
 */
import React from 'react';
import {
  DashboardOutlined,
  DatabaseOutlined,
  AlertOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  AppstoreAddOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { IconFont } from '@/utils/utils';

export interface RouteConfig {
  path: string;
  name?: string;
  icon?: React.ReactNode;
  key?: string;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
  component?: string;
  redirect?: string;
  routes?: RouteConfig[];
}

/**
 * Menu-friendly route data (without component references) used by ProLayout.
 * This mirrors the original config/routes.ts structure.
 */
export const routeMenuData: RouteConfig[] = [
  {
    path: '/dashboard',
    name: 'menu.dashboard',
    icon: <DashboardOutlined />,
    key: 'dashboard',
  },
  {
    path: '/device',
    name: 'menu.device',
    icon: <IconFont type="icon-menu-device" />,
    hideChildrenInMenu: true,
    key: 'device',
    routes: [
      { path: '/device', name: 'menu.device' },
      { path: '/device/:groupId/detail/:deviceId', name: 'menu.device.detail' },
      { path: '/device/:groupId/new', name: 'menu.device.new' },
      { path: '/device/:groupId/edit/:deviceId', name: 'menu.device.update' },
      { path: '/device/:groupId/:deviceId/rule', name: 'menu.rule.list' },
      { path: '/device/:groupId/:deviceId/rule/new', name: 'menu.rule.new' },
      { path: '/device/:groupId/:deviceId/rule/edit/:ruleId', name: 'menu.rule.update' },
      { path: '/device/:groupId/:deviceId/data-sheet', name: 'menu.device.sheet' },
      { path: '/device/:groupId/:deviceId/registers', name: 'menu.device.registers' },
    ],
  },
  {
    path: '/schema',
    name: 'menu.schema',
    icon: <IconFont type="icon-menu-schema" />,
    key: 'schema',
  },
  {
    path: '/repository',
    name: 'menu.dataRepository',
    icon: <DatabaseOutlined />,
    key: 'repository',
  },
  {
    path: '/alarm',
    name: 'menu.alarm',
    icon: <AlertOutlined />,
    hideChildrenInMenu: true,
    key: 'alarm',
    routes: [
      { path: '/alarm', name: 'menu.alarm' },
      { path: '/alarm/rule/new', name: 'menu.alarm.new' },
      { path: '/alarm/rule/edit/:uuid', name: 'menu.alarm.update' },
      { path: '/alarm/rule/detail/:uuid', name: 'menu.alarm.detail' },
    ],
  },
  {
    path: '/inend',
    name: 'menu.inend',
    icon: <AlignLeftOutlined />,
    hideChildrenInMenu: true,
    key: 'inend',
    routes: [
      { path: '/inend', name: 'menu.inend' },
      { path: '/inend/new', name: 'menu.source.new' },
      { path: '/inend/edit/:uuid', name: 'menu.source.update' },
      { path: '/inend/detail/:uuid', name: 'menu.source.detail' },
      { path: '/inend/:inendId/rule', name: 'menu.rule.list' },
      { path: '/inend/:inendId/rule/new', name: 'menu.rule.new' },
      { path: '/inend/:inendId/rule/edit/:ruleId', name: 'menu.rule.update' },
      { path: '/inend/:inendId/sub-device', name: 'menu.device.subDevice' },
    ],
  },
  {
    path: '/outend',
    name: 'menu.outend',
    icon: <AlignRightOutlined />,
    hideChildrenInMenu: true,
    key: 'outend',
    routes: [
      { path: '/outend', name: 'menu.outend' },
      { path: '/outend/new', name: 'menu.source.new' },
      { path: '/outend/edit/:uuid', name: 'menu.source.update' },
      { path: '/outend/detail/:uuid', name: 'menu.source.detail' },
    ],
  },
  {
    path: '/cecollas',
    name: 'menu.cecollas',
    icon: <IconFont type="icon-menu-cecollas" />,
    hideChildrenInMenu: true,
    key: 'cecollas',
    routes: [
      { path: '/cecollas', name: 'menu.cecollas' },
      { path: '/cecollas/detail/:uuid', name: 'menu.cecollas.detail' },
      { path: '/cecollas/action/:uuid', name: 'menu.cecollas.action' },
    ],
  },
  {
    path: '/app',
    name: 'menu.appStack',
    icon: <AppstoreAddOutlined />,
    hideChildrenInMenu: true,
    key: 'app',
    routes: [
      { path: '/app', name: 'menu.appStack' },
      { path: '/app/new', name: 'menu.appStack.new' },
      { path: '/app/edit/:uuid', name: 'menu.appStack.update' },
    ],
  },
  {
    path: '/plugin',
    name: 'menu.plugin',
    icon: <IconFont type="icon-menu-plugin" />,
    key: 'plugin',
  },
  {
    path: '/module',
    name: 'menu.cm',
    icon: <IconFont type="icon-menu-com" />,
    key: 'module',
  },
  {
    path: '/system',
    name: 'menu.system',
    icon: <SettingOutlined />,
    key: 'system',
  },
  {
    path: '/notification',
    name: 'menu.notification',
    hideInMenu: true,
    key: 'notification',
  },
];
