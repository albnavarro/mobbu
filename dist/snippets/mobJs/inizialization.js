import { inizializeApp } from './mobjs';
import * as components from './component/componentList';
import * as pages from './pages/routeList';
import { wrapper } from './wrapper';

inizializeApp({
    rootId: '#root',
    contentId: '#content',
    wrapper,
    components,
    pages,
    index: 'home',
    pageNotFound: 'pageNotFound',
    afterInit: async () => {
        //
    },
});
