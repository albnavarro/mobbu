import { MobJs } from '@mobJs';

const unsubscribe = MobJs.beforeRouteChange(({ route, templateName }) => {
    console.log(route, templateName);
});

unsubscribe();
