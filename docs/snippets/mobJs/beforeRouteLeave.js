import { mainStore } from '../js/mobjs';

const unsubscribe = mainStore.watch('beforeRouteLeave', (routename) => {
    //
});

unsubscribe();
