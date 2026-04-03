import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import Layout from './Layout';

// ---------------------------------------------------------------------------
// Lazy-loaded page components.
// The paths mirror the original UmiJS convention: './Foo' => '@/pages/Foo'
// ---------------------------------------------------------------------------
const Login = lazy(() => import('@/pages/User/Login'));

const Dashboard = lazy(() => import('@/pages/Dashboard'));

// Device
const Device = lazy(() => import('@/pages/Device'));
const DeviceDetail = lazy(() => import('@/pages/Device/Detail'));
const DeviceUpdate = lazy(() => import('@/pages/Device/Update'));
const DeviceDataPoints = lazy(() => import('@/pages/Device/DataPoints'));
const DeviceModbusSlaver = lazy(() => import('@/pages/Device/ModbusSlaver'));

// Rule (shared across device & inend)
const Rule = lazy(() => import('@/pages/Rule'));
const RuleUpdate = lazy(() => import('@/pages/Rule/Update'));

// Data Schema
const DataSchema = lazy(() => import('@/pages/DataSchema'));

// Data Repository
const DataRepository = lazy(() => import('@/pages/DataRepository'));

// Alarm Center
const AlarmCenter = lazy(() => import('@/pages/AlarmCenter'));
const AlarmRuleUpdate = lazy(() => import('@/pages/AlarmCenter/Rule/Update'));
const AlarmRuleDetail = lazy(() => import('@/pages/AlarmCenter/Rule/Detail'));

// Inend (Input Resource)
const Inend = lazy(() => import('@/pages/Inend'));
const InendUpdate = lazy(() => import('@/pages/Inend/Update'));
const InendDetail = lazy(() => import('@/pages/Inend/Detail'));
const InendSubDevice = lazy(() => import('@/pages/Inend/SubDevice'));

// Outend (Output Resource)
const Outend = lazy(() => import('@/pages/Outend'));
const OutendUpdate = lazy(() => import('@/pages/Outend/Update'));
const OutendDetail = lazy(() => import('@/pages/Outend/Detail'));

// Cecollas (Cloud Edge Collaboration)
const Cecollas = lazy(() => import('@/pages/Cecollas'));
const CecollasDetail = lazy(() => import('@/pages/Cecollas/Detail'));
const CecollasAction = lazy(() => import('@/pages/Cecollas/Action'));

// App Stack
const AppStack = lazy(() => import('@/pages/AppStack'));
const AppStackUpdate = lazy(() => import('@/pages/AppStack/Update'));

// Plugin
const Plugin = lazy(() => import('@/pages/Plugin'));

// Communication Module
const CommunicationModule = lazy(() => import('@/pages/CommunicationModule'));

// System
const System = lazy(() => import('@/pages/System'));

// Notification
const Notification = lazy(() => import('@/pages/Notification'));

// Error pages
const NotFound = lazy(() => import('@/pages/404'));
const Forbidden = lazy(() => import('@/pages/403'));

// ---------------------------------------------------------------------------
// Login wrapper - if already logged in, redirect to home
// ---------------------------------------------------------------------------
const LoginWrapper = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return <Navigate to="/" replace />;
  }
  return <Login />;
};

// ---------------------------------------------------------------------------
// Router definition
// ---------------------------------------------------------------------------
export const router = createBrowserRouter([
  // ---- Login (no layout) ----
  {
    path: '/login',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <LoginWrapper />
      </Suspense>
    ),
  },

  // ---- 403 (no layout) ----
  {
    path: '/403',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Forbidden />
      </Suspense>
    ),
  },

  // ---- Authenticated pages (with ProLayout) ----
  {
    element: <AuthGuard />,
    children: [
      {
        element: <Layout />,
        children: [
          // Root redirect
          { index: true, element: <Navigate to="/dashboard" replace /> },

          // Dashboard
          { path: 'dashboard', element: <Dashboard /> },

          // Device (nested routes)
          { path: 'device', element: <Device /> },
          { path: 'device/:groupId/detail/:deviceId', element: <DeviceDetail /> },
          { path: 'device/:groupId/new', element: <DeviceUpdate /> },
          { path: 'device/:groupId/edit/:deviceId', element: <DeviceUpdate /> },
          { path: 'device/:groupId/:deviceId/rule', element: <Rule /> },
          { path: 'device/:groupId/:deviceId/rule/new', element: <RuleUpdate /> },
          { path: 'device/:groupId/:deviceId/rule/edit/:ruleId', element: <RuleUpdate /> },
          { path: 'device/:groupId/:deviceId/data-sheet', element: <DeviceDataPoints /> },
          { path: 'device/:groupId/:deviceId/registers', element: <DeviceModbusSlaver /> },

          // Data Schema
          { path: 'schema', element: <DataSchema /> },

          // Data Repository
          { path: 'repository', element: <DataRepository /> },

          // Alarm Center (nested)
          { path: 'alarm', element: <AlarmCenter /> },
          { path: 'alarm/rule/new', element: <AlarmRuleUpdate /> },
          { path: 'alarm/rule/edit/:uuid', element: <AlarmRuleUpdate /> },
          { path: 'alarm/rule/detail/:uuid', element: <AlarmRuleDetail /> },

          // Inend (nested)
          { path: 'inend', element: <Inend /> },
          { path: 'inend/new', element: <InendUpdate /> },
          { path: 'inend/edit/:uuid', element: <InendUpdate /> },
          { path: 'inend/detail/:uuid', element: <InendDetail /> },
          { path: 'inend/:inendId/rule', element: <Rule /> },
          { path: 'inend/:inendId/rule/new', element: <RuleUpdate /> },
          { path: 'inend/:inendId/rule/edit/:ruleId', element: <RuleUpdate /> },
          { path: 'inend/:inendId/sub-device', element: <InendSubDevice /> },

          // Outend (nested)
          { path: 'outend', element: <Outend /> },
          { path: 'outend/new', element: <OutendUpdate /> },
          { path: 'outend/edit/:uuid', element: <OutendUpdate /> },
          { path: 'outend/detail/:uuid', element: <OutendDetail /> },

          // Cecollas (nested)
          { path: 'cecollas', element: <Cecollas /> },
          { path: 'cecollas/detail/:uuid', element: <CecollasDetail /> },
          { path: 'cecollas/action/:uuid', element: <CecollasAction /> },

          // App Stack (nested)
          { path: 'app', element: <AppStack /> },
          { path: 'app/new', element: <AppStackUpdate /> },
          { path: 'app/edit/:uuid', element: <AppStackUpdate /> },

          // Plugin
          { path: 'plugin', element: <Plugin /> },

          // Communication Module
          { path: 'module', element: <CommunicationModule /> },

          // System
          { path: 'system', element: <System /> },

          // Notification (hidden from menu)
          { path: 'notification', element: <Notification /> },
        ],
      },
    ],
  },

  // ---- 404 catch-all (no layout) ----
  {
    path: '*',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export default router;
