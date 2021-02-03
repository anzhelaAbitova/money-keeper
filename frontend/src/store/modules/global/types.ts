export interface IDrawerRoutes {
  drawerRoutes: Array<IDrawerRoutesItem>,
}

export interface IDrawerRoutesItem {
  rout: string;
  routName: string;
  icon: string;
  headerTitle: string;
}
