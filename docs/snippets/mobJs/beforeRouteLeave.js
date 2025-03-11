import { MobJs } from '../../../src/js/mobjs';

const unsubscribe = MobJs.beforeRouteLeave(({ route, templateName }) => {
    console.log(route, templateName);
});

unsubscribe();
