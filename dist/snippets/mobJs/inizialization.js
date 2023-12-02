import { inizializeApp } from './mobjs';
import * as components from './component/componentList';
import * as pages from './pages/routeList';
import { wrapper } from './wrapper';

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
     * Object that container all component definition.
     */
    components,

    /**
     * Object that container all route.
     */
    pages,

    /**
     * Index route.
     */
    index: 'home',

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
