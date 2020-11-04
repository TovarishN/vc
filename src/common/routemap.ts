import { LoginInfo, RegisterInfo } from './request';

export type AppRoute = '/' | '/user/login' | '/user/register' | '/user/logout';

export type MapRouteToRequestBody<T extends AppRoute> 
    = T extends '/user/login' ? LoginInfo
    : T extends '/user/logout' ? {}
    : T extends '/user/register' ? RegisterInfo
    : never;
