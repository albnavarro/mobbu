import { mainStore } from '../../../src/js/mobjs';

const unsubscribe = mainStore.watch('beforeRouteLeave', (routename) => {
    //
});

unsubscribe();
