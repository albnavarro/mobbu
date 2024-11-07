import { mobCore } from '../mobCore';
import { mainStore } from '../mobjs';
import { destroyPageScroll, initPageScroll } from '../mobMotion/plugin';

export const usePageScroll = () => {
    initPageScroll();

    mainStore.watch('beforeRouteChange', () => {
        destroyPageScroll();
    });

    mainStore.watch('afterRouteChange', () => {
        mobCore.useFrameIndex(() => {
            initPageScroll();
        }, 3);
    });
};
