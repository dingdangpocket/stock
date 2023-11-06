import ScanStack from '../screens/scanStack/ScanStack';
import InfoStack from '../screens/infoStack/InfoStack';
import ScanCreactProductSrack from '../screens/scanCreactProductSrack/ScanCreactProductSrack';
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
    option: {
      title: '扫码查询',
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'rgb(210,210,210)',
    },
  },
  {
    name: 'InfoStack',
    component: InfoStack,
    option: {title: '条码信息'},
  },
  {
    name: 'ScanCreactProductSrack',
    component: ScanCreactProductSrack,
    option: {
      title: '扫码录入',
      backgroundColor: 'rgba(0,0,0,0.8)',
      color: 'rgb(210,210,210)',
    },
  },
];

export const containStackRoutes = [
  ...HomeStackRoutes,
  ...StorageStackRoutes,
  ...ErrorStackRoutes,
  ...RecordStackRoutes,
];
