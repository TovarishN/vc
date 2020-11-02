import { LoginInfo, RegisterInfo } from './request';

export type AppRoute = '/' | '/login' | '/register' | '/logout';

export type MapRouteToRequestBody<T extends AppRoute> 
    = T extends '/login' ? LoginInfo
    : T extends '/logout' ? {}
    : T extends '/register' ? RegisterInfo
    : never;