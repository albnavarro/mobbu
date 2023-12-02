import { inizializeApp } from './mobjs';
import * as components from './component/componentList';
import * as pages from './pages/routeList';

inizializeApp({
    rootId: '#root',
    contentId: '#content',
    wrapper,
    components,
    pages,
    index: 'home',
    pageNotFound: 'pageNotFound',
    afterInit: async () => {
        await loaderTween.goTo({ opacity: 0, scale: 0.9 });
        jsMainLoader?.remove();
        jsMainLoaderBackground?.remove();
        loaderTween = null;
    },
});
