import { mainStore } from '../mobjs';
import {
    initPageScroll,
    stopPageScroll,
    updatePageScroll,
} from '../mobMotion/plugin';

export const usePageScroll = () => {
    initPageScroll();

    mainStore.watch('beforeRouteLeave', () => {
        stopPageScroll();
    });

    mainStore.watch('afterRouteChange', () => {
        updatePageScroll();
    });
};
