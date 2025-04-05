import { MobJs } from '@mobJs';

const unsubscribe = MobJs.beforeRouteLeave(({ route, templateName }) => {
    console.log(route, templateName);
});

unsubscribe();
