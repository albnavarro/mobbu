import { beforeRouteLeave } from '../../../src/js/mobjs';

const unsubscribe = beforeRouteLeave(({ route, templateName }) => {
    console.log(route, templateName);
});

unsubscribe();
