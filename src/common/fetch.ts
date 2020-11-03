import { RequestResult } from './response';
import { AppRoute, MapRouteToRequestBody } from './routemap';
import { fetchPort } from "./client_settings";

export async function fetchApi<T extends AppRoute>(route: T, body: MapRouteToRequestBody<T>): Promise<RequestResult> {
    let response = await fetch(`http://${location.hostname}:${fetchPort}${route}`, {
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        mode: 'cors',
        method: 'post',
        body: JSON.stringify(body)
    });
    let result = await response.json();
    return result;
};