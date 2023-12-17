import { mainStore } from '../js/mobjs';

const unsubscribe = mainStore.watch('afterRouteChange', (routename) => {
    //
});

unsubscribe();
