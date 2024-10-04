/**
interface routeType {
    name: string;
    layout:
        | ((arg0: { params: any; props: any }) => Promise<string>)
        | ((arg0: { params: any; props: any }) => string);
    props: any;
}
**/

// ./routes/index'

import { pageNotFound } from './404';
import { my_route } from './myRoute';
import { home } from './home';

/**
 * @type {import('../../../src/js/mobjs/type').Route[]}
 */
export const routes = [
    {
        name: 'pageNotFound',
        templateName: 'myTemplate',
        layout: pageNotFound,
        props: {},
    },
    {
        name: 'home',
        templateName: 'myTemplate',
        layout: home,
        props: {},
    },
    {
        name: 'myRoute',
        templateName: 'myTemplate',
        layout: my_route,
        props: {
            myProp: 'hello',
        },
    },
];
