import { MobJs } from '@mobJs';

const unsubscribe = MobJs.afterRouteChange(({ route, templateName }) => {
    console.log(route, templateName);
});

unsubscribe();
