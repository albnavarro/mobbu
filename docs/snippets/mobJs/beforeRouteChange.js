import { mainStore } from '../js/mobjs';

const unsubscribe = mainStore.watch('beforeRouteChange', (routename) => {
    //
});

unsubscribe();
