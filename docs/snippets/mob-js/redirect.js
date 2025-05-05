import { MobJs } from '@mobJs';

MobJs.inizializeApp({
    ...
    redirect: ({ route }) => {
        return route === 'my-route' ? 'my-new-route' : route;
    },
    ...
});
