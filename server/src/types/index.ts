
export interface Application {
  use: (...args: any[]) => any;
}

export interface ApplicationRoute {
  path: string;
  action: (...args: any[]) => any
}

export type ApplicationRoutes = ApplicationRoute[];

