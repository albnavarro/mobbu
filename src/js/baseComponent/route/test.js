import { mainStore } from '../mainStore/mainStore';

export const debugRoute = () => {
    /**
     * Some event test.
     */
    mainStore.watch('beforeRouteChange', (current, previous) => {
        console.log('----------------');
        console.log('before route change:');
        console.log(`previous:`, previous);
        console.log(`current:`, current);
    });

    mainStore.watch('activeRoute', (current) => {
        console.log(`active route:`, current);
    });

    mainStore.watch('atfterRouteChange', (current) => {
        console.log(`after route change`, current);
        console.log('----------------');
    });
};
