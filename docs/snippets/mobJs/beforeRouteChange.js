import { mainStore } from '../../../src/js/mobjs';

const unsubscribe = mainStore.watch(
    'beforeRouteChange',
    ({ route, templateName }) => {
        //
    }
);

unsubscribe();
