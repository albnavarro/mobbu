import { mainStore } from '../../../src/js/mobjs';

const unsubscribe = mainStore.watch(
    'afterRouteChange',
    ({ route, templateName }) => {
        //
    }
);

unsubscribe();
