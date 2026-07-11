import { initDocContainerStoreComputed } from './doc-container';
import { initMqStoreResize } from './mq';
import { initNavigationStoreSet } from './navigation';

export const initAppStoresAction = () => {
    initDocContainerStoreComputed();
    initMqStoreResize();
    initNavigationStoreSet();
};
