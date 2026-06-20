// ./routes/index'

import { pageNotFound } from './404';
import { my_route } from './myRoute';
import { home } from './home';
import { about } from './about';

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
        pageName: 'home',
        templateName: 'myTemplate',
        layout: home,
        props: {},
    },
    {
        name: 'about',
        pageName: 'about',
        templateName: 'myTemplate',
        layout: about,
        props: {},
    },
    {
        name: 'about-subsection',
        pageName: 'about subsection',
        templateName: 'myTemplate',
        layout: my_route,
        restoreScroll: false,
        skipTransition: true,
        parent: 'about',
        props: {
            myProp: 'hello',
        },
    },
];
