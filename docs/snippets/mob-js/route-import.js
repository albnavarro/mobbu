import { routes } from './routes';
import { MobJs } from '@mobJs';

MobJs.inizializeApp({
    ...
    routes,
    index: 'home',
    pageNotFound: 'pageNotFound',
    ...
});
