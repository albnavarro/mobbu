import { inizializeApp } from './mobjs';
import * as pages from './pages/routeList';
import { wrapper } from './wrapper';
import { beforePageTransition, pageTransition } from './pageTransition';

inizializeApp({
    /**
     * App root from index.html
     */
    rootId: '#root',

    /**
     * Id when route is loaded inside wrapper
     */
    contentId: '#content',

    /**
     * the element that defines the layout of the app
     * where to define persistent components and the root
     * of the routes.
     */
    wrapper,

    /**
     * Object that container all route.
     */
    pages,

    /**
     * Index route.
     * The name of the page function for home
     */
    index: 'home',

    /**
     * Optional function used for page-tranition
     * ( after node clone, before append cloned node ).
     */
    beforePageTransition,

    /**
     * Optional function used for page-tranition
     * Here it is possible animate old and new node.
     */
    pageTransition,

    /**
     * 404 route.
     */
    pageNotFound: 'pageNotFound',

    /**
     * Custom callback firend after inizialization
     * ( first render of app ).
     */
    afterInit: async () => {
        //
    },
});
