// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
  {
    name: '退出',
    path: '/user/login',
    icon: 'yonghu',
  },
];

const asideMenuConfig = [
  {
    name: '设备概览',
    path: '/dashboard',
    icon: 'home2',
  },
  {
    name: '策略概览',
    path: '/device/strategy',
    icon: 'chart',
  },
  {
    name: '添加策略',
    path: '/add/strategy',
    icon: 'shopcar',
  },
  {
    name: '退单管理',
    path: '/chargeback',
    icon: 'cascades',
  },
  {
    name: '发货管理',
    path: '/dispatch',
    icon: 'clock',
  },
  {
    name: '商品管理',
    path: '/goods',
    icon: 'shopcar',
  },
  {
    name: '添加商品',
    path: '/add/goods',
    icon: 'publish',
  },
  {
    name: '添加订单',
    path: '/add/order',
    icon: 'edit2',
  },
];

export { headerMenuConfig, asideMenuConfig };
