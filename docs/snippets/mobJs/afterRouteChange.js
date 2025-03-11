import { MobJs } from '../../../src/js/mobjs';

const unsubscribe = MobJs.afterRouteChange(({ route, templateName }) => {
    console.log(route, templateName);
});

unsubscribe();
