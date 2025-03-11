import { MobJs } from '../../../src/js/mobjs';

const unsubscribe = MobJs.beforeRouteChange(({ route, templateName }) => {
    console.log(route, templateName);
});

unsubscribe();
