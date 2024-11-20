import { afterRouteChange } from '../../../src/js/mobjs';

const unsubscribe = afterRouteChange(({ route, templateName }) => {
    console.log(route, templateName);
});

unsubscribe();
