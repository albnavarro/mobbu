import { beforeRouteChange } from '../../../src/js/mobjs';

const unsubscribe = beforeRouteChange(({ route, templateName }) => {
    console.log(route, templateName);
});

unsubscribe();
