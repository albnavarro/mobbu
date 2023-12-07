import { mainStore } from '../js/mobjs';

const unsubscribe = mainStore.watch('activeRoute', (routename) => {
    //
});

const { activeRoute } = mainStore.get();

unsubscribe();
