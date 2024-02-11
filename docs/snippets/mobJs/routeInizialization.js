// ./pages/routeList
export * from './routes/404';
export * from './routes/home';
export * from './routes/pageNotFound';
export * from './routes/route1';
export * from './routes/route2';
export * from './routes/route3';
export * from './routes/route4';

// main.js
import { inizializeApp } from './mobjs';
import { beforePageTransition, pageTransition } from './pageTransition';
...
import * as pages from './pages/routeList'; // load pages
...

inizializeApp({

    ...

    /**
     * Object that container all route.
     * Load pages
     */
    pages,

    /**
     * Index route.
     */
    index: 'home',

    /**
     * Optional function used for page-tranition
     * ( after node clone, before append cloned node ).
     */
    beforePageTransition,

    /**
     * Optional function used for page-tranition
     * Here it is possible animate old and new route node.
     */
    pageTransition,

    /**
     * 404 route.
     */
    pageNotFound: 'pageNotFound',


    ...

});
