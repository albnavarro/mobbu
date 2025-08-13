import {
    MAIN_STORE_ACTIVE_ROUTE,
    MAIN_STORE_AFTER_ROUTE_CHANGE,
    MAIN_STORE_BEFORE_ROUTE_CHANGE,
} from '../main-store/constant';
import { mainStore } from '../main-store/main-store';

export const debugRoute = () => {
    mainStore.watch(MAIN_STORE_BEFORE_ROUTE_CHANGE, (current) => {
        console.log('BEFORE ROUTE CHANGE:');
        console.log(`current:`, current);
    });

    mainStore.watch(MAIN_STORE_ACTIVE_ROUTE, (current) => {
        console.log(`active route:`, current);
    });

    mainStore.watch(MAIN_STORE_AFTER_ROUTE_CHANGE, (current) => {
        console.log('AFTER ROUTE CHANGE:');
        console.log(`current:`, current);
    });
};
