import { htmlObject } from '@mobJs';

/**
 * @type {import('@mobJsType').MobComponent<import('./type').MyComponent>}
 */
export const MyComponent = ({ onMount, getProxi, bindProps }) => {
    const proxiState = getProxi();

    onMount(() => {
        setTimeout(() => {
            proxiState.counter++;
        }, 500);

        return () => {};
    });

    // use function
    return htmlObject({
        component: MyChildComponent,
        modules: bindProps(() => ({
            counter: proxiState.counter,
        })),
    });
};
