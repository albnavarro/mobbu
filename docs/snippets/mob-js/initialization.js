import { routes } from './routes';
import { wrapper } from './wrapper';
import { beforePageTransition, pageTransition } from './pageTransition';
import { MobJs } from '@mobJs';

MobJs.inizializeApp({
    rootId: '#root',
    wrapper,
    contentId: '#content',
    routes,
    index: 'home',
    pageNotFound: 'pageNotFound',
    beforePageTransition,
    pageTransition,
    afterInit: async () => {
        //
    },
    redirect: ({ route }) => {
        return route;
    },
    restoreScroll: true,
});
