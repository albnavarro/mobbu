// ./routes/index'

import { pageNotFound } from './404';
import { my_route } from './myRoute';
import { home } from './home';

/**
 * @type {import('@mobJsType').Route[]}
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
        restoreScroll: false,
        props: {
            myProp: 'hello',
        },
    },
];
