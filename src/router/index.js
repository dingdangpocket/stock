import ScanStack from '../screens/scanStack/ScanStack';
import InfoStack from '../screens/infoStack/InfoStack';
const StorageStackRoutes = [];
const HomeStackRoutes = [];
const ErrorStackRoutes = [
  {
    name: 'Error',
    component: Error,
    option: {title: '错误页面'},
  },
];

const RecordStackRoutes = [
  {
    name: 'ScanStack',
    component: ScanStack,
    option: {title: '扫码查询'},
  },
];

const ScanStackRoutes = [
  {
    name: 'InfoStack',
    component: InfoStack,
    option: {title: '条码信息'},
  },
];
export const containStackRoutes = [
  ...HomeStackRoutes,
  ...StorageStackRoutes,
  ...ErrorStackRoutes,
  ...RecordStackRoutes,
  ...ScanStackRoutes,
];
