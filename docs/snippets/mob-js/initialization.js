import { routes } from './routes';
import { wrapper } from './wrapper';
import { beforePageTransition, pageTransition } from './pageTransition';
import { MobJs } from '@mobJs';

MobJs.inizializeApp({
    /**
     * App root from index.html
     */
    rootId: '#root',

    /**
     * Id where route is loaded inside wrapper
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
    routes,

    /**
     * Index route.
     * The name of the page function for home
     */
    index: 'home',

    /**
     * 404 route.
     */
    pageNotFound: 'pageNotFound',

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
     * Custom callback fired after initialization
     * ( first render of app ).
     */
    afterInit: async () => {
        //
    },

    /**
     * Redirect helper
     */
    redirect: ({ route }) => {
        return route;
    },

    /**
     * Restore scroll position on history navigate.
     */
    restoreScroll: true,
});
