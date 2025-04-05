import {
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_LEAVES,
} from '../mainStore/constant';
import { mainStore } from '../mainStore/mainStore';

export const debugRoute = () => {
    /**
     * Some event test.
     */
    mainStore.watch(MAIN_STORE_BEFORE_ROUTE_LEAVES, (current) => {
        console.log('----------------');
        console.log(`before route leave`, current);
    });

    mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, (current, previous) => {
        console.log('before route change:');
        console.log(`previous:`, previous);
        console.log(`current:`, current);
    });

    mainStore.watch(MAIN_STORE_ACTIVE_ROUTE, (current) => {
        console.log(`active route:`, current);
    });

    mainStore.watch(MAIN_STORE_AFTER_ROUTE_CHANGE, (current) => {
        console.log(`after route change`, current);
        console.log('----------------');
    });
};
