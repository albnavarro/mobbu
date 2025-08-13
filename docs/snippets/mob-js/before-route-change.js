import { MobJs } from '@mobJs';

const unsubscribe = MobJs.beforeRouteChange(
    ({ currentRoute, currentTemplate, nextRoute, nextTemplate }) => {
        console.log(currentRoute, currentTemplate, nextRoute, nextTemplate);
    }
);

unsubscribe();
