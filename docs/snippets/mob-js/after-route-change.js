import { MobJs } from '@mobJs';

const unsubscribe = MobJs.afterRouteChange(
    ({ previousRoute, previousTemplate, currentRoute, currentTemplate }) => {
        console.log(
            previousRoute,
            previousTemplate,
            currentRoute,
            currentTemplate
        );
    }
);

unsubscribe();
